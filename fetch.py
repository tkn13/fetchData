from playwright.sync_api import sync_playwright
import pandas as pd
import datetime


def main():

    chekin_date = '2024-05-13'
    chekout_date = '2024-05-14'
    hotel_name = "Hotel Vista Pattaya"

    page_url = f'https://www.booking.com/hotel/th/vista.th.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaN0BiAEBmAEmuAEXyAEM2AEB6AEB-AELiAIBqAIDuAKt5vuxBsACAdICJDRiMDZkNzQ4LWM0ODMtNGNjZC05MzViLTdkYTdkMjQ3YTM4NdgCBuACAQ&sid=ef4667ad8eab2867217dae4ef8768186&all_sr_blocks=17652337_0_2_0_0;checkin={chekin_date};checkout={chekout_date};dest_id=176523;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=17652337_0_2_0_0;hpos=1;matching_block_id=17652337_0_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=17652337_0_2_0_0__152075;srepoch=1715405621;srpvid=4923256395a000b5;type=total;ucfs=1&'


    
    with sync_playwright() as p:
        
        browser = p.chromium.launch(headless=False)
        print('Browser launched')
        page = browser.new_page()

        day = 10
        priceList = []

        for i in range(day):
            data_dict = {}
            data_dict["date"] = chekin_date + ' - ' + chekout_date
            print(f'Loading page for {chekin_date} - {chekout_date}')
            page.goto(page_url, timeout=60000)
            print('Page loaded')

            td_elements = page.query_selector_all('div.roomArea form#hprt-form div.hprt-container div.hprt-table-column table#hprt-table tbody tr')

            print(f'Checking for {chekin_date} - {chekout_date}')

            if len(td_elements) == 0:
                print(f'No data available for {chekin_date} - {chekout_date}')
                data_dict["price"] = 'No price available'
                priceList.append(data_dict)
                chekin_date, chekout_date, page_url = next_day(chekin_date, chekout_date, page_url)
                continue

            td = td_elements[0]
            ThirdTd = td.query_selector('td:nth-child(3)')
            spanPrice = ThirdTd.query_selector('span.bui-u-sr-only')
        
            if spanPrice is not None:
               data = spanPrice.inner_text()
               lastFive = data[-5:]
               data_dict["price"] = lastFive
            else:
                data_dict["price"] = 'No price available'
            
            priceList.append(data_dict)

            chekin_date, chekout_date, page_url = next_day(chekin_date, chekout_date, page_url)
        
        df = pd.DataFrame(priceList)
        df.to_csv(f'{hotel_name}.csv', index=False)
        if(browser):
            browser.close()
            print('Browser closed')
        print('Done')

def next_day(chekin_date, chekout_date, url):
    chekin_dateArray = chekin_date.split('-')
    chekout_dateArray = chekout_date.split('-')
    chekin_date = datetime.date(int(chekin_dateArray[0]), int(chekin_dateArray[1]), int(chekin_dateArray[2]))
    chekout_date = datetime.date(int(chekout_dateArray[0]), int(chekout_dateArray[1]), int(chekout_dateArray[2]))
    chekin_date = chekin_date + datetime.timedelta(days=1)
    chekout_date = chekout_date + datetime.timedelta(days=1)
    chekin_date = chekin_date.strftime('%Y-%m-%d')
    chekout_date = chekout_date.strftime('%Y-%m-%d')
    url = url.replace(f'checkin={chekin_dateArray[0]}-{chekin_dateArray[1]}-{chekin_dateArray[2]}', f'checkin={chekin_date}')
    url = url.replace(f'checkout={chekout_dateArray[0]}-{chekout_dateArray[1]}-{chekout_dateArray[2]}', f'checkout={chekout_date}')
    return chekin_date, chekout_date, url


if __name__ == '__main__':
    main()