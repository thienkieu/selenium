import  { spawn } from'child_process';

let startChrome = async (port, path, profile, headless) => {
    let date_ob = new Date();
    let subprocess;
    if (headless) {
        subprocess = await spawn ("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            ['--remote-debugging-port='+port, '--user-data-dir='+path, '--profile-directory='+profile, '--headless'],
            {
                detached : true,
                stdio: 'ignore'
            }
        );
    }else {
        subprocess = await spawn ("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
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

export default startChrome;
