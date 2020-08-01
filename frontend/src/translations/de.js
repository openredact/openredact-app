export default {
  about: {
    and: "und",
    description1: " ist eins der vom ",
    description2: " geförderten Projekte.",
  },
  annotation: {
    tagsLabel: "Verfügbare Kategorien:",
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
      "Beachte, dass die Aussagekraft der Metriken von deinen Anpassungen abhängt.",
  },
  anonymization: {
    anonymization: "Anonymisierung",
    advanced_settings: "Mechanismus pro Kategorie",
    do_not_anonymize: "Nicht anonymisieren",
    default: "Default Mechanismus",
    default_tooltip:
      "Wähle den Default Mechanismus zur Anonymisierung der personenbezogenen Daten aus. Gehe mit dem Mauszeiger über die Mechanismen um mehr Informationen zu erhalten.",
    use_default: "Default benutzen",
    generalization: {
      name: "Generalisierung",
      replacement: "Ersetzen mit",
      tooltip: "Ersetze mit einem allgemeineren Ausdruck",
    },
    laplace_noise: {
      epsilon: "Epsilon",
      epsilon_hint: "Epsilon muss größer als 0 sein",
      epsilon_tooltip:
        "Das Epsilon kontrolliert wie viel der Wert verrauscht wird. Ein kleineres Epsilon erhöht die Privatsphäre.",
      name: "Laplace Verrauschung",
    },
    options: "Optionen",
    pseudonymization: {
      name: "Pseudonymisierung",
      format_string: "Ersetzen mit",
      format_string_hint: "benutze {} einmal als Platzhalter",
      counter_value: "Initialer Wert",
      counter_value_hint: "gib eine Zahl größer 0 sein",
      tooltip: "Ersetze mit einem Pseudonym",
    },
    randomized_response: {
      name: "Zufällige Antwort",
      no_config:
        "Dieser Mechanismus ist für differentielle Privatsphäre vorkonfiguriert",
    },
    stateful: "Zustandsbehaftet",
    suppression: {
      as_original: "wie im Original",
      name: "Schwärzen",
      custom_length: "Länge",
      redact: "Schwärzen",
      suppression_char: "Ersetzen mit",
      custom_length_hint:
        "lasse das Feld leer oder gib eine Zahl größer 0 sein",
      tooltip: "Ersetze jedes Zeichen mit einem anderen",
    },
  },
  app: {
    fetching_recognizers_failed_toast:
      "Das Laden der verfügbaren Erkennungsmechanismen ist fehlgeschlagen.",
    network_error_toast: "Der Server ist nicht erreichbar.",
    rendering_error: "Unerwarteter Fehler",
    rendering_error_action: "Bitte versuche die Seite erneut zu laden.",
  },
  disclaimer: {
    text:
      "Bitte nutze diese Software nicht zur Anonymisierung von Dokumenten. Bitte benutze aus dieser Software heruntergeladene Dokumente nicht weiter.",
    title: "Dies ist ein Prototyp",
  },
  help: {
    intro:
      "Die folgenden Schritte skizzieren kurz den Anonymisierungs-Prozess:",
    item1: "Lade das Dokument hoch, dass Du anonymisieren willst.",
    item2:
      "Erweitere und korrigiere was automatisch als personenbezogene Daten erkannt wurde in der linken Dokumentenansicht.",
    item3: "Konfiguriere die Anonymisierung nach deinen Anforderungen.",
    item4:
      "Überprüfe die Vorschau der Anonymisierung in der rechten Dokumentenansicht und lade dein anonymisiertes Dokument herunter.",
    tip:
      "Tipp: Viele Elemente zeigen einen Hilfetext an, wenn Du mit dem Mauszeiger über sie gehst.",
  },
  main: {
    anonymize_file_failed_toast:
      "Das Erstellen der anonymisierten Datei ist fehlgeschlagen.",
    anonymizing_piis_failed_toast:
      "Das Anonymisieren der personenbezogenen Daten ist fehlgeschlagen. Bitte überprüfe die Annotationen und Anonymisierungs Einstellungen.",
    computing_scores_failed_toast:
      "Die Berechnung statistischer Maße für die automatische Identifizierung persönlicher Daten ist fehlgeschlagen.",
    download: "Herunterladen",
    find_piis_failed_toast: "Die Verarbeitung der Datei ist fehlgeschlagen.",
    new_document: "Neues Dokument",
    new_document_confirm:
      "Neues Dokument erstellen? Alle Änderungen auf dem aktuellen Dokument gehen verloren",
  },
  nav: {
    about: "Über OpenRedact",
    help: "Hilfe",
    settings: "Einstellungen",
  },
  preview: {
    warning:
      "Dies ist nur eine Vorschau. Der tatsächliche Inhalt und die Formatierung können abweichen.",
  },
  settings: {
    recognizers: {
      description:
        "Aktiviere Erkenner um nach personenbezogene Daten für eine Kategorie zu suchen.",
      names: {
        number_recognizer: "Suche nach Zahlen",
        de_country_recognizer: "Suche nach Namen von Ländern",
        de_date_recognizer: "Suche nach Datumsangaben",
        email_recognizer: "Suche nach E-Mail Adressen",
        phone_number_recognizer: "Suche nach Telefonnummern",
        money_recognizer: "Suche nach Geldbeträgen",
        statistical_recognizer:
          "Nutze statistische Modelle um nach Personen, Orten, Organisationen, und anderen Entitäten zu suchen",
      },
      title: "Kategorien",
    },
  },
  tags: {
    number: "Zahlen",
    country: "Länder",
    date: "Datumsangaben",
    email: "E-mail Adressen",
    loc: "Orte",
    money: "Geldbeträge",
    misc: "Andere",
    org: "Organisationen",
    per: "Personen",
    phone: "Telefonnummern",
  },
};
