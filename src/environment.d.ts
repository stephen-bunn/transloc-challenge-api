declare namespace NodeJS {
  /**
   * Augments for the NodeJS.ProcessEnv interface.
   *
   * @interface ProcessEnv
   */
  interface ProcessEnv {
    /**
     * The environment type for node.
     * `production` is only used during production builds.
     *
     * @type {("development" | "production")}
     */
    NODE_ENV: "development" | "production"

    /**
     * The database url for the geoipv4 database.
     *
     * @type {string}
     */
    DATABASE_URL: string
  }
}
