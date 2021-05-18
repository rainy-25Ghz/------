const { chromium } = require('playwright');
const login_info = {
    username: "修改此处为你的学号",
    password: "修改此处为你的密码",
    //经纬度 默认为玉泉校区
    longitude: 120.1248,
    latitude: 30.2695,
};
(async () => {
    const browser = await chromium.launch({
        headless: false
    });


    const context = await browser.newContext({
        geolocation: { longitude: login_info.longitude, latitude: login_info.latitude },
        permissions: ['geolocation']
    });
    // Open new page
    const page = await context.newPage();

    // Go to https://zjuam.zju.edu.cn/cas/login?service=https%3A%2F%2Fhealthreport.zju.edu.cn%2Fa_zju%2Fapi%2Fsso%2Findex%3Fredirect%3Dhttps%253A%252F%252Fhealthreport.zju.edu.cn%252Fncov%252Fwap%252Fdefault%252Findex%26from%3Dwap
    await page.goto('https://zjuam.zju.edu.cn/cas/login?service=https%3A%2F%2Fhealthreport.zju.edu.cn%2Fa_zju%2Fapi%2Fsso%2Findex%3Fredirect%3Dhttps%253A%252F%252Fhealthreport.zju.edu.cn%252Fncov%252Fwap%252Fdefault%252Findex%26from%3Dwap');

    // Click [placeholder="职工号/学号/手机号码/邮箱/别名"]
    await page.click('[placeholder="职工号/学号/手机号码/邮箱/别名"]');

    // Fill [placeholder="职工号/学号/手机号码/邮箱/别名"]
    await page.fill('[placeholder="职工号/学号/手机号码/邮箱/别名"]', login_info.username);

    // Click input[name="password"]
    await page.click('input[name="password"]');

    // Fill input[name="password"]
    await page.fill('input[name="password"]', login_info.password);

    // Click text=登 录
    await page.click('text=登 录');
    // assert.equal(page.url(), 'https://healthreport.zju.edu.cn/ncov/wap/default/index');

    // Triple click li:nth-child(2) .text input
    await page.click('li:nth-child(2) .text input', {
        clickCount: 3
    });

    // Click li:nth-child(2) .text input
    await page.click('li:nth-child(2) .text input');

    // Click li:nth-child(3) .text input
    await page.click('li:nth-child(3) .text input');

    // Click text=今日是否在校？ Are you on campus today? 是 Yes 否 No >> :nth-match(span, 3)
    await page.click('text=今日是否在校？ Are you on campus today? 是 Yes 否 No >> :nth-match(span, 3)');

    // Click [placeholder="点击获取地理位置 Click to get geographic location"]
    await page.click('[placeholder="点击获取地理位置 Click to get geographic location"]');

    // Click text=是 Yes，请及时向所在单位报告实际情况。please contact your college/school immediately 否 No >> :nth-match(i, 2)
    await page.click('text=是 Yes，请及时向所在单位报告实际情况。please contact your college/school immediately 否 No >> :nth-match(i, 2)');

    // Click li:nth-child(34) .radio div div span i
    await page.click('li:nth-child(34) .radio div div span i');

    // Click text=提交信息 Submit information
    await page.click('text=提交信息 Submit information');

    // Click text=确认提交
    await page.click('text=确认提交');

    // Click text=确定 OK
    await page.click('text=确定 OK');

    // ---------------------
    await context.close();
    await browser.close();
})();