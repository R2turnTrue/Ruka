const axios = require('axios')
const cheerio = require('cheerio')
const log = console.log

const getHtml = async () => {
  try {
    return await axios.get('https://www.google.com/search?q=%EC%BD%94%EB%94%A9&oq=%EC%BD%94%EB%94%A9')
  } catch (error) {
    console.error(error)
  }
}

getHtml()
  .then(html => {
    const ulList = []
    const $ = cheerio.load(html.data)
    const $bodyList = $('div#rso').children('div.g')// .children("li.section02");

    $bodyList.each(function (i, elem) {
      ulList[i] = {
        title: $(this).find('div.rc div.yuRUbf a h3.LC201b span').text(),
        url: $(this).find('div.rc div.yuRUbf a').attr('href')
      }
    })

    // const data = ulList.filter(n => n.title);
    // return data;
  })
  .then(res => log(res))
