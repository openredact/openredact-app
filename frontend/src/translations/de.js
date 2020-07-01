export default {
  annotation: {
    browse: "Computer durchsuchen",
    drop: "Ziehe eine %{formats} Datei hierhin.",
    fetching_tags_failed_toast:
      "Das Laden der Klassennamen für die manuelle Annotation ist fehlgeschlagen.",
    metric: {
      f1: "F1-Maß",
      f2: "F2-Maß",
      falseNegatives: "Falsch Negativ",
      falsePositives: "Falsch Positiv",
      precision: "Genauigkeit",
      recall: "Trefferquote",
      truePositives: "Richtig Positiv",
    },
    na: "n.a.",
    or: "oder",
    scores: "Metriken",
    scores_description:
      "Die folgenden Metriken bewerten die automatische Erkennung von personenbezogenen Daten im Vergleich zu Ihren manuellen Anpassungen.",
    scores_note:
      "Beachten Sie, dass die Aussagekraft der Metriken von Ihren Anpassungen abhängt.",
    tag: {
      loc: "Ort",
      misc: "Sonstige",
      org: "Organisation",
      per: "Person",
      state: "Staat",
      total: "Total",
    },
  },
  anonymization: {
    do_not_anonymize: "Nicht anonymisieren",
    default: "Default",
    use_default: "Default benutzen",
    generalization: { name: "Generalisierung", replacement: "Ersetzen mit" },
    pseudonymization: {
      name: "Pseudonymisierung",
      format_string: "Ersetzen mit",
      format_string_hint: "benutze {} einmal als Platzhalter",
      initial_counter_value: "Initialer Wert",
      initial_counter_value_hint: "gib eine Zahl größer 0 sein",
    },
    stateful: { name: "Zustandsbehaftet" },
    suppression: {
      as_original: "wie im Original",
      name: "Schwärzen",
      custom_length: "Länge",
      suppression_char: "Ersetzen mit",
      custom_length_hint:
        "lasse das Feld leer oder gib eine Zahl größer 0 sein",
    },
  },
  app: {
    network_error_toast: "Der Server ist nicht erreichbar.",
    rendering_error: "Unerwarteter Fehler",
    rendering_error_action: "Bitte versuche die Seite erneut zu laden.",
  },
  main: {
    anonymize_file_failed_toast:
      "Das Erstellen der anonymisierten Datei ist fehlgeschlagen.",
    anonymizing_piis_failed_toast:
      "Das Anonymisieren der personenbezogenen Daten ist fehlgeschlagen.",
    computing_scores_failed_toast:
      "Die Berechnung statistischer Maße für die automatische Identifizierung persönlicher Daten ist fehlgeschlagen.",
    find_piis_failed_toast: "Die Verarbeitung der Datei ist fehlgeschlagen.",
  },
  nav: {
    help: "Hilfe",
    settings: "Einstellungen",
  },
  preview: {
    download: "Herunterladen",
  },
  tags: {
    loc: "Orte",
    misc: "Andere",
    org: "Organisationen",
    per: "Personen",
    state: "Staaten",
  },
};
