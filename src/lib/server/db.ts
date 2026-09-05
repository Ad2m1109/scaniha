import fs from "fs";
import path from "path";

export interface OwnerMapping {
  sub: string;
  businessId: string;
  spreadsheetId?: string;
}

const dbDir = path.join(process.cwd(), ".data");
const dbFile = path.join(dbDir, "mappings.json");

function ensureDb() {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]), "utf-8");
  }
}

export function getOwnerMapping(sub: string): OwnerMapping | undefined {
  ensureDb();
  const data = JSON.parse(fs.readFileSync(dbFile, "utf-8")) as OwnerMapping[];
  return data.find((m) => m.sub === sub);
}

export function saveOwnerMapping(mapping: OwnerMapping): void {
  ensureDb();
  const data = JSON.parse(fs.readFileSync(dbFile, "utf-8")) as OwnerMapping[];
  const index = data.findIndex((m) => m.sub === mapping.sub);
  if (index >= 0) {
    data[index] = mapping;
  } else {
    data.push(mapping);
  }
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
}
