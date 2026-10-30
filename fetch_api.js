const fs = require('fs');

async function run() {
  const boundary = '----WebKitFormBoundarykT61muqHoBKcCsBh';
  const body = 
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_web_url"\r\n\r\n' +
    'https://laixedongdo_27013.huelms.com/learn/course/learn/46344114/34794408-34794408/34794408-34794406-1/dao-duc-nguoi-lai-xe-van-hoa-giao-thong-va-ky-nang-pccc-va-cuu-nan-cuu-ho.html\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_device_uuid"\r\n\r\n' +
    '4b9d4939-a40d-41e5-a699-b39272a081ea\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_token"\r\n\r\n' +
    '1dfab_tnmjno_wZ4Fd\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_uiid"\r\n\r\n' +
    '45396674\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_uid"\r\n\r\n' +
    '6adab3d5650eb1bd0f0634da\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_ri"\r\n\r\n' +
    'dc4df7899d0bb27a27be400e331df12b\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh\r\n' +
    'Content-Disposition: form-data; name="_sand_rit"\r\n\r\n' +
    'b0cfe752a4c931d5a0529a1c718dada0:IF4SfSCwBO4JoGoA/aQZEhcaDlxa/vOSyJxSCWB81rsysM/vct9jgVzk5uIi8MS8\r\n' +
    '------WebKitFormBoundarykT61muqHoBKcCsBh--\r\n';

  try {
    const res = await fetch("https://staging-api.lotuslms.com/practice/api/get-question-bank-status?bank_iids%5B%5D=29262930&exam_template_iid=27049761&last_ts=0&submit=1&_sand_ajax=1&_sand_platform=3&_sand_readmin=1&_sand_is_wan=false&_sand_ga_sessionToken=&_sand_ga_browserToken=&_sand_masked=&_sand_session_id=659894a0-17c3-49be-b783-67ec42160f1f&allow_cache_api_cdn=1&_sand_domain=truonglaixedongdo&_sand_client_sync_token=n:c1c64720a85cb3ad0ac030a2&lang=vn&_sand_user_agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/156.0.0.0%20Safari/537.36", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "vi,vi-VN;q=0.9,en;q=0.8",
        "content-type": "multipart/form-data; boundary=" + boundary,
        "priority": "u=1, i"
      },
      "referrer": "https://laixedongdo_27013.huelms.com/learn/course/learn/46344114/34794408-34794408/34794408-34794406-1/dao-duc-nguoi-lai-xe-van-hoa-giao-thong-va-ky-nang-pccc-va-cuu-nan-cuu-ho.html",
      "body": body,
      "method": "POST"
    });

    console.log("Response status:", res.status);
    const json = await res.json();
    fs.writeFileSync('api_response_raw.json', JSON.stringify(json, null, 2), 'utf8');
    console.log("Success:", json.success);
    const qList = json.result?.questions?.result || [];
    console.log("Count of questions:", qList.length);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

run();
