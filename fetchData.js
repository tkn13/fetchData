const { chromium } = require('playwright');
const fs = require('fs');
const { promisify } = require('util');

const page_url = "https://www.booking.com/hotel/th/m-casa-pattaya.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuALyqv6xBsACAdICJGEwYTc1NDQwLTJmYmItNGRmOC1hNmVmLWNmMDRhYzk4ZDhjZNgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=925119305_364313333_0_9_0;checkin=2024-07-09;checkout=2024-07-10;dest_id=9251193;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=925119305_364313333_0_9_0;hpos=1;matching_block_id=925119305_364313333_0_9_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=925119305_364313333_0_9_0__147750;srepoch=1715443081;srpvid=a06d7043d16b00f1;type=total;ucfs=1&"

async function loadData(){
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(page_url, { timeout: 60000 });
    const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
    const tr = td_elements[0];
    const td = await tr.$('td:nth-child(3)');
    const spanPrice = await td.$('span.bui-u-sr-only');
    const data = await spanPrice.innerText();
    console.log(data);
    browser.close();
    // treminat the process
    process.exit();
}

loadData();