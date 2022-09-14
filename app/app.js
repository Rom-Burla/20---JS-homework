let url = "./app/pageObj.json";
let obj = "";
let postArr = [];
let root = document.getElementById("root");
let makeObj = (pageObj) => {
  obj = pageObj;
};
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    makeObj(data);
    console.log(data);
  });

const apiData = (url, time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let { pages } = obj;
      if (pages[url]) {
        res(pages[url]);
      } else {
        rej();
        console.log("rejected");
      }
    }, time);
  });
};

// apiData("/users", 2000)
//   .then((data) => {
//     console.log(data);
//     data.forEach((user) => {
//       return apiData(`/user/${user.id}`, 2000)
//         .then((data) => {
//           console.log(data);
//           return data.postId;
//         }, 2000)
//         .then((data) => {
//           console.log(data);
//           data.forEach((postId) => {
//             return apiData(`/post/${postId}`, 2000).then((data) => {
//               console.log(data);
//               postArr.push(data);
//               for (let i = 0; i < postArr.length; i++) {
//                 for (let k = 0; k < postArr.length; k++) {
//                   if (i !== k) {
//                     if (postArr[i].title !== postArr[k].title) {
//                       let post = async () => {
//                         await render(`<h1>${postArr[i].title}</h1>`, 1000);
//                       };
//                     }
//                   }
//                 }
//               }
//             }, 2000);
//           });
//         }, 2000);
//     });
//   }, 2000)
//   .catch(() => {
//     console.log("page 404");
//   });

let render = async () => {
  let users = await apiData("/users", 1000);
  console.log(users);
  users.forEach((user) => {
    let render = async () => {
      let account = await apiData(`/user/${user.id}`, 1000);
      console.log(account);
      let postNum = account.postId;
      console.log(postNum);
      postNum.forEach((postId) => {
        let render = async () => {
          let post = await apiData(`/post/${postId}`, 1000);
          console.log(post);
          if (account.postTitle !== "Do it yourself kitchen") {
            root.innerHTML += `<h1 class="title" style="color:blue">${account.postTitle}</h1>`;
          }
          root.innerHTML += `          
          <h1 class="title">${post.title}</h1>
          <p class="user-name">${account.userName}<p>
          <p class="content">${post.content}</p><br>`;
        };
        render();
      });
    };
    render();
  });
};
render();
