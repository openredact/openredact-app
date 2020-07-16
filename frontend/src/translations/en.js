export default {
  annotation: {
    browse: "Browse your computer",
    drop: "Drop a %{formats} document here.",
    fetching_tags_failed_toast:
      "Loading the categories for manual annotation failed.",
    metric: {
      f1: "F1-Score",
      f2: "F2-Score",
      falseNegatives: "False Negatives",
      falsePositives: "False Positives",
      precision: "Precision",
      recall: "Recall",
      truePositives: "True Positives",
    },
    na: "n/a",
    or: "or",
    scores: "Scores",
    scores_description:
      "The following metrics evaluate the automatic detection of personal data on the basis of your manual corrections.",
    scores_note:
      "Note that the metrics can only be as accurate as your corrections.",
  },
  anonymization: {
    do_not_anonymize: "Do not anonymize",
    default: "Default",
    use_default: "Use default",
    generalization: { name: "Generalization", replacement: "Replace with" },
    pseudonymization: {
      name: "Pseudonymization",
      format_string: "Replace with",
      format_string_hint: "use {} once as placeholder",
      counter_value: "Initial value",
      counter_value_hint: "enter a number larger than 0",
    },
    stateful: { name: "Stateful" },
    suppression: {
      as_original: "as original",
      name: "Suppression",
      custom_length: "Length",
      custom_length_hint: "leave empty or enter a number larger than 0",
      suppression_char: "Replace with",
    },
  },
  app: {
    fetching_recognizers_failed_toast:
      "Loading the list of available recognizers failed.",
    network_error_toast: "The server is not available.",
    rendering_error: "Unexpected Error",
    rendering_error_action: "Please try reloading the page.",
  },
  main: {
    anonymize_file_failed_toast: "Creating the anonymized file failed.",
    anonymizing_piis_failed_toast: "Anonymizing the personal data failed.",
    computing_scores_failed_toast:
      "Computing statistical measures for the automatic identification of personal data failed.",
    find_piis_failed_toast: "Processing of the document failed.",
  },
  nav: {
    help: "Help",
    settings: "Settings",
  },
  preview: {
    download: "Download",
  },
  recognizer_config_dialog: {
    description:
      "You can deactivate recognizers here (e.g. to reduce the computational load).",
    title: "Active Recognizers",
  },
  tags: {
    email: "E-Mail",
    gpe: "Geopolitical Entities",
    loc: "Locations",
    misc: "Miscellaneous",
    org: "Organizations",
    per: "Persons",
    phone: "Phone",
  },
};
