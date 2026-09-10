import fs from "fs";
import path from "path";

export interface OwnerMapping {
  sub: string;
  businessId: string;
  spreadsheetId?: string;
  onboardingComplete?: boolean;
  driveInitialized?: boolean;
}

const dbDir = path.join(process.cwd(), ".data");
const dbFile = path.join(dbDir, "mappings.json");

// Simple in-process mutex for concurrent file access
let dbLock = false;
const dbQueue: (() => void)[] = [];

function acquireLock(): Promise<void> {
  return new Promise((resolve) => {
    function tryAcquire() {
      if (!dbLock) {
        dbLock = true;
        resolve();
      } else {
        dbQueue.push(tryAcquire);
      }
    }
    tryAcquire();
  });
}

function releaseLock() {
  const next = dbQueue.shift();
  if (next) {
    next();
  } else {
    dbLock = false;
  }
}

async function ensureDb() {
  if (!fs.existsSync(dbDir)) {
    await fs.promises.mkdir(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    await fs.promises.writeFile(dbFile, JSON.stringify([]), "utf-8");
  }
}

async function readDb(): Promise<OwnerMapping[]> {
  await ensureDb();
  return JSON.parse(await fs.promises.readFile(dbFile, "utf-8")) as OwnerMapping[];
}

async function writeDb(data: OwnerMapping[]): Promise<void> {
  await ensureDb();
  const tmpFile = `${dbFile}.tmp`;
  await fs.promises.writeFile(tmpFile, JSON.stringify(data, null, 2), "utf-8");
  await fs.promises.rename(tmpFile, dbFile);
}

export async function getOwnerMapping(sub: string): Promise<OwnerMapping | undefined> {
  await acquireLock();
  try {
    const data = await readDb();
    return data.find((m) => m.sub === sub);
  } finally {
    releaseLock();
  }
}

export async function getOwnerMappingByBusinessId(businessId: string): Promise<OwnerMapping | undefined> {
  await acquireLock();
  try {
    const data = await readDb();
    return data.find((m) => m.businessId === businessId);
  } finally {
    releaseLock();
  }
}

export async function saveOwnerMapping(mapping: OwnerMapping): Promise<void> {
  await acquireLock();
  try {
    const data = await readDb();
    const index = data.findIndex((m) => m.sub === mapping.sub);
    if (index >= 0) {
      data[index] = mapping;
    } else {
      data.push(mapping);
    }
    await writeDb(data);
  } finally {
    releaseLock();
  }
}
