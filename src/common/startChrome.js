import  { spawn } from'child_process';

let startChrome = async (port, path, profile) => {
    let date_ob = new Date();
    let subprocess = await spawn ("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        ['--remote-debugging-port='+port, '--user-data-dir='+path, '--profile-directory='+profile, '--headless'],
        {
            detached : true,
            stdio: 'ignore'
        }
    );

    await subprocess.unref();
    return subprocess;
}

export default startChrome;
