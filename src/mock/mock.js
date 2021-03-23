import Mock from 'mockjs';

Mock.mock('/pay/add','post',()=>{
    return {
        code:200,
        msg:'success'
    }
})

Mock.mock('/pay/list','get',()=>{
    return[{
        id: "1",
        nickname: "张三1",
        phone: "18850022005",
        openId: "15sdg5dsfb",
        birthday: "2001-12-12",
        sex: "男",
        email: "zhangsan@163.com",
        show:0
      },
      {
        id: "2",
        nickname: "张三",
        phone: "18850022005",
        openId: "15sdg5dsfb",
        birthday: "2001-12-12",
        sex: "男",
        email: "zhangsan@163.com",
        show:1
      }]
})