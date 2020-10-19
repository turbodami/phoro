import React from "react";
import Discussion from "./Discussion";
import "../css/Feed.css";

function Feed() {
  return (
    <div className='feed'>
      <div className='feed__header'>
        <h2>Home</h2>
      </div>

      <Discussion
        key='asdadasda'
        source='Repubblica'
        text='dasidnais daosidj aosidj aoisdjoadsij oaisjd'
        avatar='https://en.wikipedia.org/wiki/Nazi_symbolism#/media/File:National_Socialist_swastika.svg'
        link='https://www.google.com/search?q=nested+comments&sxsrf=ALeKk02KQhG_SgOyZF1rg88iF_kB3Htb5g:1603039859156&tbm=isch&source=iu&ictx=1&fir=GZ3d1tIhCMMfqM%252Cm4mh3shFkH9jbM%252C_&vet=1&usg=AI4_-kT-7DZdkHAD4tSrgDaz-K5z2MlZUw&sa=X&ved=2ahUKEwjwlfbqzL7sAhWBqHEKHXAsCF0Q_h0wAnoECAgQBg&biw=1920&bih=936#imgrc=Fxc5BA5C-MrZmM'
        image='https://www.ansa.it/webimages/img_700/2020/10/19/e7c1a65a365a59586ee91294df9bf3b0.jpg'
        timestamp='11032019'
      />
    </div>
  );
}

export default Feed;
