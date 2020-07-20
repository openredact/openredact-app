export default {
  about: {
    and: "and",
    description1: " is one of the projects supported by the ",
    description2: ".",
    disclaimer:
      "This is a prototype. Do not use this software to anonymize documents. Do not further use the documents downloaded from this software.",
  },
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
    anonymization: "Anonymization",
    advanced_settings: "Set Per Category",
    do_not_anonymize: "Do not anonymize",
    default: "Default Mechanism",
    use_default: "Use default",
    generalization: {
      name: "Generalization",
      replacement: "Replace with",
      tooltip: "Replace with a more general phrase",
    },
    options: "Options",
    pseudonymization: {
      name: "Pseudonymization",
      format_string: "Replace with",
      format_string_hint: "use {} once as placeholder",
      counter_value: "Initial value",
      counter_value_hint: "enter a number larger than 0",
      tooltip: "Replace with a pseudonym",
    },
    stateful: "Stateful",
    suppression: {
      as_original: "as original",
      name: "Suppression",
      custom_length: "Length",
      custom_length_hint: "leave empty or enter a number larger than 0",
      suppression_char: "Replace with",
      tooltip: "Replace each character with a different one",
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
    download: "Download",
    find_piis_failed_toast: "Processing of the document failed.",
    new_document: "New Document",
  },
  nav: {
    about: "About OpenRedact",
    help: "Help",
    settings: "Settings",
  },
  settings: {
    recognizers: {
      description: "Enable recognizers to search personal data for a category.",
      names: {
        decountryrecognizer: "Recognize country names",
        dephonenumberrecognizer: "Recognize phone numbers",
        emailrecognizer: "Recognize e-mail addresses",
        flairstatisticalrecognizer:
          "Use flair to recognize persons, locations, organizations and more",
        spacystatisticalrecognizer:
          "Use spaCy to recognize persons, locations, organizations and more",
      },
      title: "Categories",
    },
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
