const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.getTodoItems = async function() {
  
  const data = {
    "Personal": [],
    "Work": [],
    "Others": []
  };
  
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
    "filter": {
      "property": "Done",
      "checkbox": {
        "equals": false
      }
    },
    "sorts": [
        {
            "property": "Priority",
            "direction": "ascending"
        },
        {
            "timestamp": "created_time",
            "direction": "ascending"
        }
    ]
  });
  
  const results = response.results;

  for(var i = 0; i < results.length; i++) {
    const result = results[i];
    const category = result.properties["Tags"].select?.name || "Others";
    const item = result.properties["Name"].title[0].plain_text;

    data[category].push(item);
  }

  console.log(data);
  return data;
}
