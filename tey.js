const { chromium } = require('playwright');
const fs = require('fs');
const { promisify } = require('util');
const { exit } = require('process');
const writeFileAsync = promisify(fs.writeFile);




async function main() {
    var chekin_date = '2024-05-13';
var chekout_date = '2024-05-14';
var page_url = `https://www.booking.com/hotel/th/vista.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAKt5vuxBsACAdICJDRiMDZkNzQ4LWM0ODMtNGNjZC05MzViLTdkYTdkMjQ3YTM4NdgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=17652337_0_2_0_0;checkin=${chekin_date};checkout=${chekout_date};dest_id=176523;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=17652337_0_2_0_0;hpos=1;matching_block_id=17652337_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=17652337_0_2_0_0__152075;srepoch=1715405621;srpvid=4923256395a000b5;type=total;ucfs=1&`;
    const hotel_name = "Hotel Vista Pattaya";


    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const day = 1;
    const priceList = [];

    for (let i = 0; i < day; i++) {
        const data_dict = {};
        data_dict["date"] = `${chekin_date} - ${chekout_date}`;
        console.log(`Loading page for ${chekin_date} - ${chekout_date}`);
        await page.goto(page_url, { timeout: 60000 });
        console.log('Page loaded');

        const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');

        console.log(`Checking for ${chekin_date} - ${chekout_date}`);

        if (td_elements.length === 0) {
            console.log(`No data available for ${chekin_date} - ${chekout_date}`);
            data_dict["price"] = 'No price available';
            priceList.push(data_dict);
            const { next_chekin_date, next_chekout_date, next_page_url } = nextDay(chekin_date, chekout_date, page_url);
            chekin_date = next_chekin_date;
            chekout_date = next_chekout_date;
            page_url = next_page_url;
            continue;
        }

        const td = td_elements[0];
        const ThirdTd = await td.$('td:nth-child(3)');
        const spanPrice = await ThirdTd.$('span.bui-u-sr-only');

        if (spanPrice) {
            const data = await spanPrice.innerText();
            const lastFive = data.slice(-5);
            data_dict["price"] = lastFive;
        } else {
            data_dict["price"] = 'No price available';
        }

        priceList.push(data_dict);

        //nextDay()
    }

    await writeFileAsync(`${hotel_name}.csv`, JSON.stringify(priceList));
    await browser.close();
    console.log('Browser closed');
    console.log('Done');
    exit();
}

async fu

// function nextDay() {
//     chekin_date = format(addDays(new Date(chekin_date), 1), 'yyyy-MM-dd');
//     chekout_date = format(addDays(new Date(chekout_date), 1), 'yyyy-MM-dd');
//     page_url = `https://www.booking.com/hotel/th/vista.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAKt5vuxBsACAdICJDRiMDZkNzQ4LWM0ODMtNGNjZC05MzViLTdkYTdkMjQ3YTM4NdgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=17652337_0_2_0_0;checkin=${chekin_date};checkout=${chekout_date};dest_id=176523;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=17652337_0_2_0_0;hpos=1;matching_block_id=17652337_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=17652337_0_2_0_0__152075;srepoch=1715405621;srpvid=4923256395a000b5;type=total;ucfs=1&`;
// }

console.log('Started');
main();
console.log('Ended');

