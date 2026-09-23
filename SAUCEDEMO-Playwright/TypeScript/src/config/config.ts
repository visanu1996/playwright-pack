// ------------------------ Global config
export const globalWait = 20000 // as millisecond.
export const maxRetries = 3
export const navWait = 10000
export const isHeadless = !!process.env.CI
export const interactDelay = 700

// ------------------------ Url for test.
export const webURL = {
    SD: "https://www.saucedemo.com/",
    YT: "https://www.youtube.com/",
    GG: "https://www.google.com/"
}