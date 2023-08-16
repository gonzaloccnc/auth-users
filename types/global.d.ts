
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      URI_MONGO: string
      SECRET_WORD: string
    }
  }
}

export { }
