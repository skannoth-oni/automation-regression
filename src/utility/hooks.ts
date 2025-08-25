import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pagefixture"
import { getapi_token } from "./common.api";
import { time } from "console";
import HomePage from "../test/ui/pages/home.page";


let browser: Browser
let context: BrowserContext

let homepage = new HomePage();

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    process.env.URI = 'https://fractus.evbeyhuxhidtzr.codi.bio/'
    context = await browser.newContext()
    context.browser()
    const page = await context.newPage()
    pageFixture.page = page
    // page.setViewportSize({ width: 1512, height: 767 })
    page.goto(process.env.URI!)
    await page.waitForTimeout(2000)
    await homepage.email().fill("shijith.qaengineer@gmail.com")
    await page.waitForTimeout(1000)
    await homepage.password().fill("Automation");
    
    await page.waitForTimeout(4000)

    console.log(await homepage.submitButton().allInnerTexts())
    console.log("I Enter username and password")
    await homepage.submitButton().click();
    await page.waitForTimeout(4000)
    // console.log("I click button")
})


AfterStep(async function ({ pickle, result }) {

    if (result?.status == Status.FAILED) {
        let scenario_name = pickle.name
        const img = await pageFixture.page.screenshot({ path: './test-results/screenshot/' + scenario_name + '}.png', type: "png" })
        this.attach(img, "image/png")
    }

})

After(async function (pickle) {
    // Add Screenshot after each step

    // await pageFixture.page.close()
    // await context.close()
})

AfterAll(async function () {
    await browser.close()
})




