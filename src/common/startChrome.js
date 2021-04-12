const  { spawn } = require ('child_process');

let startChrome = async (port, path, profile, headless) => {
    let date_ob = new Date();
    let subprocess;
    if (headless) {
        subprocess = await spawn ("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            [   '--remote-debugging-port='+port, 
                '--user-data-dir='+path, 
                '--profile-directory='+profile, 
                '--headless',
                '--ignore-certificate-errors',
                '--window-size=1920,1080',
            ],
            {
                detached : true,
                stdio: 'ignore'
            }
        );
    }else {
        subprocess = await spawn ("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            ['--remote-debugging-port='+port, '--user-data-dir='+path, '--profile-directory='+profile],
            {
                detached : true,
                stdio: 'ignore'
            }
        );
    }


    await subprocess.unref();
    return subprocess;
}

module.exports = startChrome;
