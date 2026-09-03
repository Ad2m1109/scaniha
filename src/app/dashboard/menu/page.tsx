"use client";

import { Edit, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageIntro } from "@/components/shared/PageIntro";

const products = [
  { id: 1, name: "Cappuccino", price: 450, category: "Cafés", available: true },
  { id: 2, name: "Croissant", price: 250, category: "Pâtisseries", available: true },
  { id: 3, name: "Jus d'orange", price: 350, category: "Boissons", available: false },
];

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Menu board"
        title="Your menu, always in sync."
        description="Keep prices and availability fresh for the digital menu your customers see."
        action={
          <Button
            type="button"
            className="h-10 gap-2 rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_8px_18px_#7C3AED2E] hover:bg-purple-dark"
          >
            <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            Add product
          </Button>
        }
      />

      <section aria-label="Menu items" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="glass-card min-w-0 border-0 p-0 ring-0">
            <CardContent className="flex min-h-[150px] flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="card-title">{product.name}</h2>
                <Badge
                  className={`h-auto rounded-full border-0 px-2.5 py-1 text-[10px] font-bold ${
                    product.available ? "bg-success-soft text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {product.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <p className="mt-1.5 text-xs font-medium text-muted">{product.category}</p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                <p className="metric-value">DA {product.price}</p>
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="icon-button h-9 w-9 rounded-xl border-line bg-surface-soft"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.8} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="icon-button h-9 w-9 rounded-xl border-line bg-surface-soft hover:border-destructive/30"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4 text-destructive" strokeWidth={1.8} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
