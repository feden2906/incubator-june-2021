
const taskScreen = document.getElementById('taskScreen');
const user = JSON.parse(new URL(location.href).searchParams.get('user'));

// console.log(user);
(showUserInfo)(user, taskScreen);

function showUserInfo (user, elWrapper) {
    const elUser = crEl('div', 'user ', 'user flxRow wrap flxAcrCenter');
    const elUserInfo = crEl('div', '', 'userInfo flxCol txtL');
    elUserInfo.innerHTML = `<p><b>${user.id}. ${user.name}</b> (${user.username})</p>
                            <p>e-mail: ${user.email}</p>
                            <p>phone: ${user.phone}</p>
                            <p>web: ${user.website}</p>
                            <p>company: ${user.company.name} 
                                        (<span>${user.company.catchPhrase}</span>)</p>
                            <p>slogan: ${user.company.bs}</p>`;
    const elUserAddr = crEl('div', '', 'userAddr flxCol txtL');
    elUserAddr.innerHTML = `<p><u>Address:</u></p>
                            <p>${user.address.street}, str.</p>
                            <p>apt.: ${user.address.suite}</p>
                            <p>city: ${user.address.city}</p>
                            <p>zip: ${user.address.zipcode}</p>
                            <p>gps: ${user.address.geo.lat}, ${user.address.geo.lng}</p>`;
    const elButton = crEl('button', '', 'button', 'Show the posts of current user');
    elButton.onclick = () => {
        const elPosts = document.getElementById('posts');
        if (!elPosts ) {
            elButton.innerText = 'Hide the posts of current user';
            showPostTitles(user.id, elButton);
        } else {
            elButton.innerText = 'Show the posts of current user';
            deletePosts();
        }
    };
    elUser.append(elUserInfo, elUserAddr);
    elWrapper.append(elUser);
    elUser.insertAdjacentElement('afterend', elButton);
}

function showPostTitles (userId, elUser) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(resp => resp.json())
        .then(resp => {
            const elPosts = crEl('div', 'posts', 'posts flxCol');
            for (const post of resp) {
                const elPost = crEl('div', '', 'post flxRow flxAcrCenter');
                const elPostTxt = crEl('div', '', 'flxCol txtJustify w100prc');
                elPostTxt.innerHTML = `<p>Title: <b>${post.title}</b></p>`;
                const elButton = crEl('button', '', 'button bkgBeg', 'Go to post');
                elButton.onclick = () => { open(`./post-details.html?post=${JSON.stringify(post)}`, '_self');}
                elPost.append(elPostTxt, elButton); // ?post=${JSON.stringify(post)}
                elPosts.append(elPost);
            }
            elUser.insertAdjacentElement('afterend', elPosts);
        } );
}


function deletePosts () {
    const elPosts = document.getElementById('posts');
    if (elPosts) elPosts.remove();
}
