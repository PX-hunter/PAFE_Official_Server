const {exec} = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
  // 1=1 防止查询条件为空
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }  
  if(keyword){
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData={}) => {
  let {title,content,author} = blogData
  title = xss(title)
  const createTime = Date.now()
  const sql = `
  insert into blogs (title,content,createtime,author)
  values ('${title}','${content}',${createTime},'${author}')
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData={}) => {
  const {title,content} = blogData
  const sql = `
  update blogs set title='${title}',content='${content}' where id=${id}
  `
  const updateData = await exec(sql)
  if(updateData.affectedRows > 0){
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};