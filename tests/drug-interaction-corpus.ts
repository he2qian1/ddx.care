export interface DrugInteractionRegressionCase {
  id: string;
  drugNames: [string, string];
  rxcuis: [string, string];
  labelInteractionText: [string, string];
  expectedStatus: "found" | "none_found";
  reviewNote: string;
  /** RxNav-resolved SBD/SCD names, when they differ from the raw inputs
   * (e.g. brand-name inputs resolve to a full strength/form phrase). */
  resolvedNames?: [string, string];
  /** openFDA generic_name values served with each mocked label. */
  labelGenericNames?: [string, string];
}

/**
 * Clinician-reviewed cases for label-text regression behavior. A negative case
 * means no literal cross-mention in the supplied labels, not clinical clearance.
 */
export const clinicianReviewedDrugInteractionCases: DrugInteractionRegressionCase[] =
  [
    {
      id: "aspirin-warfarin-positive",
      drugNames: ["aspirin", "warfarin"],
      rxcuis: ["1191", "11289"],
      labelInteractionText: [
        "Concomitant use of aspirin with warfarin may increase bleeding risk.",
        "Warfarin used with aspirin may increase bleeding risk.",
      ],
      expectedStatus: "found",
      reviewNote:
        "The expected positive is limited to a literal FDA-label cross-mention.",
    },
    {
      id: "lipitor-coumadin-brand-names-positive",
      drugNames: ["Lipitor", "Coumadin"],
      rxcuis: ["262095", "855290"],
      resolvedNames: [
        "atorvastatin 80 MG Oral Tablet [Lipitor]",
        "warfarin sodium 1 MG Oral Tablet [Coumadin]",
      ],
      labelGenericNames: ["atorvastatin calcium", "warfarin sodium"],
      labelInteractionText: [
        "Patients receiving chronic warfarin treatment should be monitored for changes in prothrombin time.",
        "Atorvastatin is a CYP3A4 inhibitor and may alter the anticoagulant effect of this drug.",
      ],
      expectedStatus: "found",
      reviewNote:
        "Both inputs are brand names resolving to full SBD phrases, and each label mentions only the partner's bare ingredient name — matching requires the ingredient/openFDA variants, not the raw brand input, RxCUI, or full resolved phrase.",
    },
    {
      id: "acetaminophen-loratadine-label-negative",
      drugNames: ["acetaminophen", "loratadine"],
      rxcuis: ["161", "28889"],
      labelInteractionText: [
        "Use only as directed and do not exceed the recommended dose.",
        "Use as directed for temporary relief of allergy symptoms.",
      ],
      expectedStatus: "none_found",
      reviewNote:
        "The expected negative only asserts no literal cross-mention in these fixtures.",
    },
  ];
