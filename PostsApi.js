import Auth from '../components/Auth/Auth.js'

class PostsApi {

    static getLocation(){
        let temp = [];
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                temp = [position.coords.longitude, position.coords.latitude];
                console.log(temp);
            });
        }
        return temp;
    }

    /* GET */
    static getPosts() {
        
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token;
        this.getLocation();

        return fetch('http://localhost:5000/posts/nearby?lng=' + '-123.27445069999999' + '&lat=' + '44.568720299999995' + '&meters=100',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error
        });
        
        // return fetch('http://localhost:5000/posts/',{
            // method: 'GET',
            // headers:{
                // 'Accept': 'application/json',
                // 'content-type': 'application/json',
                // 'Authorization': header
            // }
        // }).then(response => {
            // return response.json()
        // }).catch(error => {
            // return error
        // });
    }

    // TODO: Change the fetch call to nearby
    //static getMapPosts(lng, lat, meters){
    static getMapPosts(lng, lat, meters){
      const url = 'http://localhost:5000/posts/nearby?lng=' + lng + '&lat=' + lat + '&meters=' + meters
      console.log(url)

      const token = Auth.getCookie('token');
      const header = 'Bearer ' + token
      return fetch(url,{
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': header
          }
      }).then(response => {
          return response.json()
      }).catch(error => {
          return error
      });
    }

    static getSamplePosts() { // for development testing only.

        const post1 = {
            '_id': '012345',
            'username': 'Billy Bob',
            'content': 'Here is the sample post content with the writing the person did and here it is.',
            'created': 'Jan 1st, 2019',
            'postImage': 'http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg',
            'likes': '51'
        }

        const post2 = {
            '_id': '54321',
            'username': 'Jill Jillian',
            'content': 'More writings by a person who wrote them to put them on a post which you can read here.',
            'created': 'Feb 11th, 2019',
            'postImage': 'http://images4.fanpop.com/image/photos/19600000/Peter-Griffin-The-ultimate-Family-Guy-character-family-guy-characters-19628944-918-683.jpg',
            'likes': '517'
        }

        const post3 = {
            '_id': '34125',
            'username': 'Phil Bobsy',
            'content': 'The content which you will see when people post information to their location on this app.',
            'created': 'Feb 15th, 2019',
            'postImage': 'https://images-na.ssl-images-amazon.com/images/I/41XTp8JDV5L.jpg',
            'likes': '17'
        }

        return new Promise(
            (resolve, reject) => {
                resolve([post1, post2, post3])
            }
        )
    }

    /* POST */
    static addNewPost(postData) {
        const fetchURL = 'http://localhost:5000/posts/' + Auth.parseJwt(Auth.getCookie('token')).sub;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        console.log(fetchURL);
        return fetch(fetchURL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            },
            body:JSON.stringify({
                content: postData.postContent,
                location: {
                    type: "Point",
                    coordinates: postData.currentLocation
                }
            })
        }).then(response => {
            console.log(response.json())
            return response.json()
        }).catch(error => {
            return error
        });
    }
}

export default PostsApi;