const { chromium } = require('playwright');
const fs = require('fs');
const date_and_time = require('date-and-time');
const { get } = require('http');

var checkinDate = new Date();

var path1 = "h1.txt";
var path2 = "h2.txt";
var path3 = "h3.txt";
var path4 = "h4.txt";
var path5 = "h5.txt";



var urls = [
    `https://www.booking.com/hotel/th/m-casa-pattaya.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuALyqv6xBsACAdICJGEwYTc1NDQwLTJmYmItNGRmOC1hNmVmLWNmMDRhYzk4ZDhjZNgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=925119305_364313333_0_9_0;checkin=$checkin;checkout=$checkout;dest_id=9251193;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=925119305_364313333_0_9_0;hpos=1;matching_block_id=925119305_364313333_0_9_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=925119305_364313333_0_9_0__147750;srepoch=1715443081;srpvid=a06d7043d16b00f1;type=total;ucfs=1&selected_currency=THB#hotelTmpl`,
]
const pathdata = ["h1.txt", "h2.txt", "h3.txt", "h4.txt", "h5.txt"];

async function loadData(){
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const promisses = [];
    
    
    /* HELL ZONE ONE START*/

    var startday1 = new Date(checkinDate);
    var totalday1 = 10;

    promisses.push(
        context.newPage().then(async (page) => {
            for(var i = 0; i < urls.length; i++){
                var checkin = getBookingFormat(startday1);
                var checkout = nextDay(checkin);
                var url = `https://www.booking.com/hotel/th/m-casa-pattaya.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=925119301_364313333_2_9_0;checkin=${checkin};checkout=${checkout};dest_id=9251193;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=925119301_364313333_2_9_0;hpos=1;matching_block_id=925119301_364313333_2_9_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=925119301_364313333_2_9_0__186300;srepoch=1715704975;srpvid=153a7585195f0334;type=total;ucfs=1&selected_currency=THB#hotelTmpl`
                for(var j = 0; j < totalday1; j++){
                    await page.goto(url, { timeout: 60000 });
                    const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
                    const tr = td_elements[0];
                    const td = await tr.$('td:nth-child(3)');
                    const spanPrice = await td.$('span.bui-u-sr-only');
                    const data = await spanPrice.innerText();

                    //wirete to file
                    fs.appendFile(path1, data + '\n', function (err) {
                        if (err) throw err;
                        console.log('01Saved!');
                    });

                    checkin = checkout;
                    checkout = nextDay(checkin);
                    url = `https://www.booking.com/hotel/th/m-casa-pattaya.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=925119301_364313333_2_9_0;checkin=${checkin};checkout=${checkout};dest_id=9251193;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=925119301_364313333_2_9_0;hpos=1;matching_block_id=925119301_364313333_2_9_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=925119301_364313333_2_9_0__186300;srepoch=1715704975;srpvid=153a7585195f0334;type=total;ucfs=1&selected_currency=THB#hotelTmpl`
                    
                    //url = url.replace(tempCheckin, checkin).replace(tempCheckout, checkout);
                }
            }
            page.close();
        })
    );


    /* HELL ZONE ONE END */


    /* HELL ZONE TWO START*/

    var startday2 = new Date(checkinDate);
    var totalday2 = 10;

    promisses.push(
        context.newPage().then(async (page) => {
            for(var i = 0; i < urls.length; i++){
                var checkin = getBookingFormat(startday2);
                var checkout = nextDay(checkin);
                var url = `https://www.booking.com/hotel/th/sn-plus.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=117746509_88890090_2_2_0&checkin=${checkin}&checkout=${checkout}&dest_id=1177465&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=117746509_88890090_2_2_0&hpos=1&matching_block_id=117746509_88890090_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=117746509_88890090_2_2_0__613700&srepoch=1715705120&srpvid=343175cf27ea008d&type=total&ucfs=1&selected_currency=THB#hotelTmpl`
                for(var j = 0; j < totalday2; j++){
                    await page.goto(url, { timeout: 60000 });
                    const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
                    const tr = td_elements[0];
                    const td = await tr.$('td:nth-child(3)');
                    const spanPrice = await td.$('span.bui-u-sr-only');
                    const data = await spanPrice.innerText();

                    //wirete to file
                    fs.appendFile(path2, data + '\n', function (err) {
                        if (err) throw err;
                        console.log('02Saved!');
                    });

                    checkin = checkout;
                    checkout = nextDay(checkin);
                    url = `https://www.booking.com/hotel/th/sn-plus.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=117746509_88890090_2_2_0&checkin=${checkin}&checkout=${checkout}&dest_id=1177465&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=117746509_88890090_2_2_0&hpos=1&matching_block_id=117746509_88890090_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=117746509_88890090_2_2_0__613700&srepoch=1715705120&srpvid=343175cf27ea008d&type=total&ucfs=1&selected_currency=THB#hotelTmpl`
                    

                    //url = url.replace(tempCheckin, checkin).replace(tempCheckout, checkout);
                }
            }
            page.close();
        })
    );

    /* HELL ZONE TWO END */

    /* HELL ZONE THREE START*/

    var startday3 = new Date(checkinDate);
    var totalday3 = 10;

    promisses.push(
        context.newPage().then(async (page) => {
            for(var i = 0; i < urls.length; i++){
                var checkin = getBookingFormat(startday3);
                var checkout = nextDay(checkin);
                var url = `https://www.booking.com/hotel/th/sn-plus.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=117746509_88890090_2_2_0&checkin=${checkin}&checkout=${checkout}&dest_id=1177465&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=117746509_88890090_2_2_0&hpos=1&matching_block_id=117746509_88890090_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=117746509_88890090_2_2_0__613700&srepoch=1715705120&srpvid=343175cf27ea008d&type=total&ucfs=1&selected_currency=THB#hotelTmpl`
                for(var j = 0; j < totalday3; j++){
                    await page.goto(url, { timeout: 60000 });
                    const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
                    const tr = td_elements[0];
                    const td = await tr.$('td:nth-child(3)');
                    const spanPrice = await td.$('span.bui-u-sr-only');
                    const data = await spanPrice.innerText();

                    //wirete to file
                    fs.appendFile(path3, data + '\n', function (err) {
                        if (err) throw err;
                        console.log('03Saved!');
                    });

                    checkin = checkout;
                    checkout = nextDay(checkin);
                    url = `https://www.booking.com/hotel/th/sn-plus.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKvpo6yBsACAdICJGMzYTBiYTRiLTA0ZGUtNDFmNy1hNWZjLWZjZTI3YjhmYzIwMtgCBeACAQ&sid=11deb8d05e8ce4658d168dbeeeee732a&all_sr_blocks=117746509_88890090_2_2_0&checkin=${checkin}&checkout=${checkout}&dest_id=1177465&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=117746509_88890090_2_2_0&hpos=1&matching_block_id=117746509_88890090_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=117746509_88890090_2_2_0__613700&srepoch=1715705120&srpvid=343175cf27ea008d&type=total&ucfs=1&selected_currency=THB#hotelTmpl`
                    //url = url.replace(tempCheckin, checkin).replace(tempCheckout, checkout);

                }
            }
            page.close();
        })
    );

    /* HELL ZONE THREE END */

    /* HELL ZONE FOUR START*/

    var startday4 = new Date(checkinDate);
    var totalday4 = 10;

    promisses.push(
        context.newPage().then(async (page) => {
            for(var i = 0; i < urls.length; i++){
                var checkin = getBookingFormat(startday4);
                var checkout = nextDay(checkin);
                var url = `https://www.booking.com/hotel/mx/safi-royal-luxury-centro.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAL8lo6yBsACAdICJGU2OWFlMTBkLWIzMjAtNDc4Ni05YjVmLTU5YzMwNTJkZTAxZNgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=2475602_0_2_0_0;checkin=${checkin};checkout=${checkout};dest_id=900129990;dest_type=landmark;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=2475602_0_2_0_0;hpos=1;matching_block_id=2475602_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=2475602_0_2_0_0__157878;srepoch=1715702663;srpvid=af6b7101f84a028a;type=total;ucfs=1&selected_currency=THB`
                for(var j = 0; j < totalday4; j++){
                    await page.goto(url, { timeout: 60000 });
                    const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
                    const tr = td_elements[0];
                    const td = await tr.$('td:nth-child(3)');
                    const spanPrice = await td.$('span.bui-u-sr-only');
                    const data = await spanPrice.innerText();

                    //wirete to file
                    fs.appendFile(path4, checkin + " - " + checkout + " " + data + '\n', function (err) {
                        if (err) throw err;
                        console.log('04Saved!');
                    });

                    checkin = checkout;
                    checkout = nextDay(checkin);
                    url = `https://www.booking.com/hotel/mx/safi-royal-luxury-centro.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAL8lo6yBsACAdICJGU2OWFlMTBkLWIzMjAtNDc4Ni05YjVmLTU5YzMwNTJkZTAxZNgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=2475602_0_2_0_0;checkin=${checkin};checkout=${checkout};dest_id=900129990;dest_type=landmark;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=2475602_0_2_0_0;hpos=1;matching_block_id=2475602_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=2475602_0_2_0_0__157878;srepoch=1715702663;srpvid=af6b7101f84a028a;type=total;ucfs=1&selected_currency=THB`

                    //url = url.replace(tempCheckin, checkin).replace(tempCheckout, checkout);

                }
            }
            page.close();
        })
    );

    /* HELL ZONE FOUR END */
                    


    await Promise.all(promisses);
    await browser.close();
}

function getBookingFormat(date){
    return date_and_time.format(date, 'YYYY-MM-DD');
}

function nextDay(date){
    var temp = date_and_time.parse(date, 'YYYY-MM-DD');
    temp = date_and_time.addDays(temp, 1);
    return date_and_time.format(temp, 'YYYY-MM-DD');
}

loadData();



/*
 promiss.push(context.newPage().then(async (page) => {
        for(var i = 0; i < urls.length; i++){
            var checkin = getBookingFormat(startday1);
            var checkout = getBookingFormat(nextDay(startday1));
            var url = urls[i].replace('$checkin', checkin).replace('$checkout', checkout);
            url = "https://www.booking.com/hotel/mx/safi-royal-luxury-centro.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAL8lo6yBsACAdICJGU2OWFlMTBkLWIzMjAtNDc4Ni05YjVmLTU5YzMwNTJkZTAxZNgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=2475602_0_2_0_0;checkin=2024-07-09;checkout=2024-07-10;dest_id=900129990;dest_type=landmark;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=2475602_0_2_0_0;hpos=1;matching_block_id=2475602_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=2475602_0_2_0_0__157878;srepoch=1715702663;srpvid=af6b7101f84a028a;type=total;ucfs=1&"
            for(var j = 0; j < totalday1; j++){
                await page.goto(url, { timeout: 60000 });
                const td_elements = await page.$$('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr');
                const tr = td_elements[0];
                const td = await tr.$('td:nth-child(3)');
                const spanPrice = await td.$('span.bui-u-sr-only');
                const data = await spanPrice.innerText();
                
                const tempCheckin = checkin;
                const tempCheckout = checkout;
                checkin = checkout;
                checkout = nextDay(getDayfromBookingFormat(checkout));
                url = url.replace(tempCheckin, checkin).replace(tempCheckout, checkout);
            }
        }
        page.close();
    }));
*/