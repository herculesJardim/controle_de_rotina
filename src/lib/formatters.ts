export function formatDateForDisplay(value?: string | null) {
  if (!value) return "";

  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  }

  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(trimmed)) {
    return trimmed.replace(/\//g, "-");
  }

  return trimmed;
}

export function normalizeDateForStorage(value?: string | null) {
  if (!value) return "";

  const trimmed = value.trim();

  const match = /^\d{2}[-/]\d{2}[-/]\d{4}$/.exec(trimmed);
  if (match) {
    const [day, month, year] = trimmed.replace(/\//g, "-").split("-");
    return `${year}-${month}-${day}`;
  }

  return trimmed;
}

export function formatTimeForDisplay(value?: string | null) {
  if (!value) return "--:--";

  const trimmed = value.trim();
  const match = /^([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2}))?$/.exec(trimmed);

  if (!match) {
    return trimmed;
  }

  return `${match[1].padStart(2, "0")}:${match[2].padStart(2, "0")}`;
}

export function normalizeTimeForStorage(value?: string | null) {
  if (!value) return "";

  const trimmed = value.trim();
  const match = /^([0-9]{1,2})[:.]([0-9]{1,2})$/.exec(trimmed);

  if (!match) {
    return trimmed;
  }

  return `${match[1].padStart(2, "0")}:${match[2].padStart(2, "0")}`;
}
