"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Coffee,
  MapPin,
  Share2,
  Gift,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { completeOnboarding } from "@/app/actions/onboarding";

interface OnboardingData {
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  description: string;
  logo: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  loyaltyEnabled: boolean;
  pointsPerVisit: number;
  welcomeBonus: number;
}

const STEPS = [
  { id: "welcome", title: "Your cafe", icon: Coffee },
  { id: "details", title: "Location & contact", icon: MapPin },
  { id: "branding", title: "Brand & social", icon: Share2 },
  { id: "loyalty", title: "Loyalty rules", icon: Gift },
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    businessName: "",
    tagline: "",
    phone: "",
    address: "",
    description: "",
    logo: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    loyaltyEnabled: true,
    pointsPerVisit: 50,
    welcomeBonus: 100,
  });

  function update(field: keyof OnboardingData, value: string | boolean | number) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await completeOnboarding(data);
    } catch {
      setSubmitting(false);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="auth-page grid min-h-screen place-items-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-purple text-white">
            <Sparkles className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Set up your cafe
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            A few details and you&apos;re ready to go.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                  i < step
                    ? "bg-purple text-white"
                    : i === step
                    ? "border-2 border-purple text-purple"
                    : "border border-line text-muted"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-8 rounded-full transition-all ${
                    i < step ? "bg-purple" : "bg-line"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card */}
        <Card className="glass-card border-0 shadow-xl ring-0">
          <CardContent className="p-6">
            {/* Step 1: Welcome */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink">
                    What&apos;s your cafe called?
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    This appears on your menu, QR page, and loyalty cards.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business name *</Label>
                  <Input
                    id="business-name"
                    placeholder="e.g. Northstar Coffee"
                    value={data.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="e.g. Good coffee, remembered."
                    value={data.tagline}
                    onChange={(e) => update("tagline", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink">
                    Where can customers find you?
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Help regulars locate your counter and get in touch.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+213 555 123 456"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Rue Didouche Mourad, Algiers"
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="A line or two about what makes your place special."
                    value={data.description}
                    onChange={(e) => update("description", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Branding */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink">
                    Make it feel like yours
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Add your logo and social links so customers recognize you
                    everywhere.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-line bg-surface-soft p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-purple-soft text-purple">
                    <Share2 className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-muted">
                    Logo upload available after setup in your profile settings.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourcafe"
                    value={data.instagram}
                    onChange={(e) => update("instagram", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="Page URL"
                    value={data.facebook}
                    onChange={(e) => update("facebook", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    placeholder="+213555123456"
                    value={data.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Loyalty */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink">
                    How should loyalty work?
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Set the basics — you can change these anytime from your
                    dashboard.
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-line bg-surface-soft p-4">
                  <div>
                    <p className="text-sm font-bold text-ink">
                      Enable loyalty program
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Customers earn points on every visit.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      update("loyaltyEnabled", !data.loyaltyEnabled)
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      data.loyaltyEnabled ? "bg-purple" : "bg-line"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        data.loyaltyEnabled
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                {data.loyaltyEnabled && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="points-per-visit">Points per visit</Label>
                      <Input
                        id="points-per-visit"
                        type="number"
                        min={1}
                        value={data.pointsPerVisit}
                        onChange={(e) =>
                          update("pointsPerVisit", Number(e.target.value))
                        }
                        className="h-10"
                      />
                      <p className="text-[11px] text-muted">
                        Points added every time a customer checks in.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcome-bonus">Welcome bonus</Label>
                      <Input
                        id="welcome-bonus"
                        type="number"
                        min={0}
                        value={data.welcomeBonus}
                        onChange={(e) =>
                          update("welcomeBonus", Number(e.target.value))
                        }
                        className="h-10"
                      />
                      <p className="text-[11px] text-muted">
                        Points a new member gets when they join.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="gap-1.5 text-muted"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 0 && !data.businessName.trim()}
                  className="gap-1.5 bg-purple text-white hover:bg-purple-dark"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="gap-1.5 bg-purple text-white hover:bg-purple-dark"
                >
                  {submitting ? "Setting up..." : "Launch my cafe"}
                  {!submitting && <Check className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip link */}
        {step < STEPS.length - 1 && (
          <p className="text-center text-xs text-muted">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="font-semibold text-purple transition-colors hover:text-purple-dark"
            >
              Skip for now
            </button>
            {" "}— you can fill this in later from your profile.
          </p>
        )}
      </div>
    </div>
  );
}
