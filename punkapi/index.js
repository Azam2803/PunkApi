const app = new Vue({
    el:'#app1',
    data:{
        page:'1',
        perPage:'5',
        // baseUrl:`https://api.punkapi.com/v2/beers?page=1&per_page=${this.perPage}`,
        baseUrl:'https://api.punkapi.com/v2/beers?page=1&per_page=5',
        totalItems: '325',
        totalPages: '65',
        nextPage:'2',
        prevPage:'0',
        firstPage:'1',
        lastPage:'65',
        currentPage:'1',
        result: '',
        searchItem:'',
        pageBtn:'',
    },
    methods:{
        fetchBeerData: function () {
            this.baseUrl=`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}`
            fetch(this.baseUrl)
            .then(response => response.json())
            .then(data => this.result=data)

            // fetch(`https://api.punkapi.com/v2/beers?page=65&per_page=5`)
            // fetch(`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}`)
            // .then(response => response.json())
            // .then(data => this.result=data)

            // axios.get(this.baseUrl+'posts')
            // .then(response => {
            // this.data = response.data;
            // })
            // .catch(response => {
            // console.log(response);
            // });
          },
          selectItemBtn: function() {
            let e = document.getElementById("select-items");
            this.perPage = e.value;
            console.log(this.perPage)
          },
          setPages: function () {
            this.totalPages = Math.ceil(this.totalItems / this.perPage);
            this.lastPage = this.totalPages;
            // for (let index = 1; index <= numberOfPages; index++) {
            //   this.pages.push(index);
            // }
          },
          nextPageBtn:  function(){
              if(this.nextPage<=this.lastPage){
                  this.page=this.nextPage;
                  this.currentPage=this.page;
                  this.nextPage=parseInt(this.nextPage)+1;
                  this.prevPage=parseInt(this.prevPage)+1;
              }
              console.log('next Button clicked');
          },
          prevPageBtn: function(){
              if(this.prevPage>=1){
                  this.page=this.prevPage;
                  this.currentPage=this.page;
                  this.prevPage=parseInt(this.prevPage)-1;
                  this.nextPage=parseInt(this.nextPage)-1;
              }
              console.log('previous Button clicked');
          },
          filterItem: function(){
            if(this.searchItem){
                fetch(`https://api.punkapi.com/v2/beers?beer_name=${this.searchItem}`)
                .then(response => response.json())
                .then(data=>this.result=data)
            }
          },
          listItemBtn: function(){
            if(this.pageBtn){
                this.baseUrl=`https://api.punkapi.com/v2/beers?page=${this.pageBtn}&per_page=${this.perPage}`
                fetch(this.baseUrl)
                .then(response => response.json())
                .then(data=>this.result=data)

                this.prevPage=parseInt(this.pageBtn)-1;
                this.nextPage=parseInt(this.pageBtn)+1;
                this.currentPage=this.pageBtn;
            }
          }
    },
    // computed:{
    //     filterItem: function(){
    //         if(this.searchItem){
    //             this.searchBaseUrl=`https://api.punkapi.com/v2/beers?beer_name=${this.searchItem}`
    //             fetch(searchBaseUrl)
    //             .then(response => response.json())
    //             .then(data=>this.result=data)
    //         }
    //     }
    // },
    created() {
        this.fetchBeerData()
    },
    watch: {
        perPage () {
          this.setPages();
        },
        nextPage (){
            this.fetchBeerData()
        },
        prevPage (){
            this.fetchBeerData()
        }
    } 
})

