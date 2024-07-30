const CardEvent = {
  CREATE: "card:create",
  REORDER: "card:reorder",
  RENAME: "card:rename",
  CHANGE_DESCRIPTION: "card:change-description",
  DELETE: "card:delete",
  COPY: "card:copy",
} as const;

export { CardEvent };
