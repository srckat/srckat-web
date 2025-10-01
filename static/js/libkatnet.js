async function initPageCustom() {
  try {
    // replace with your actual API URL
    const response = await fetch("https://api.srckat.me/v1/config");
    const data = await response.json();

    // pull out the unix timestamp
    const timestamp = data.config["owner"].age_unix;

    // convert unix timestamp (seconds) → JS Date (ms)
    const birthDate = new Date(timestamp * 1000);
    const now = new Date();

    // calculate age
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    // adjust if birthday hasn’t happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }

    //console.log(`Age: ${age}`);
    document.getElementById("lkat-name").innerHTML = data.config.owner.shortname;
    document.getElementById("lkat-age").innerHTML = age;
    document.getElementById("lkat-pronoun").innerHTML = data.config.owner.pronoun;
    document.getElementById("lkat-motd").innerHTML = data.config.katweb.motd;
    document.getElementById("lkat-trusted").innerHTML = data.config.katweb.trusted;
    document.getElementById("lkat-favgame").innerHTML = data.config.katweb.favgame;
    document.getElementById("lkat-currproj").innerHTML = data.config.katweb.currproj;
    
    if (data.config.global_netvars.s_hgf) {
      document.getElementById("lkat-hgf").innerHTML = "Taken :3";
    } else {
      document.getElementById("lkat-hgf").innerHTML = "Single :[";
    }
  } catch (err) {
    console.error("Error fetching age:", err);
  }
}

async function loadNews() {
    const response = await fetch("https://pop.srckat.me/api/news");
    const data = await response.json();
    console.log(data);

    // Sort news by timestamp descending (latest first)
    data.news.sort((a, b) => b.timestamp - a.timestamp);

    let smol_entries = "";
    let larg_entries = "";
    let smol_counter = 0;

    for (const en of data.news) {
        if (smol_counter < 3) {
            smol_entries += `
            <div class="bb-border" style="padding-left: 20px;">
                <p class="schoolbell-regular" style="font-size: 25px; line-height: 1px;"><b>${en.title}</b></p>
                <p class="schoolbell-regular text-cutoff" style="font-size: 20px; max-width: 24ch; line-height: 20px;">${en.content}</p>
            </div><br/>
            `;
            smol_counter++;
        }

        larg_entries += `
            <div class="bb-border" style="padding-left: 20px; margin: 0 auto; max-width: 100%;">
                <p class="schoolbell-regular" style="font-size: 25px; line-height: 1px;"><b>${en.title}</b></p>
                <p class="schoolbell-regular" style="font-size: 15px; line-height: 5px;">${getReadableTime(en.timestamp)}</p>
                <p class="schoolbell-regular" style="font-size: 20px; line-height: 20px;">${en.content}</p>
            </div><br/>
        `;
    }

    document.getElementById("news-entries-smol").innerHTML = smol_entries;
    document.getElementById("news-entries-larg").innerHTML = larg_entries;
}

async function setup() {
  await initPageCustom();
  await loadNews();
  
  const onInit = new CustomEvent('onInitComplete', {
      //detail: { message: 'Hello from custom event!', data: 123 },
      bubbles: true, // Allows the event to bubble up the DOM tree
      cancelable: true // Allows the event to be canceled
  });
  await window.dispatchEvent(onInit);
}

setup();