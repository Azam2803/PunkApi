Vue.component('v-pagination', window['vue-plain-pagination'])

const app = new Vue({
    el:'#app1',
    data:{
        page:'1',
        perPage:'5',
        // baseUrl:'https://api.punkapi.com/v2/beers?page=1&per_page=5',
        baseUrl:'https://api.punkapi.com/v2/beers?',
        totalItems: 325,
        totalPages: 65,
        lastPage: 65,
        result: '',
        searchItem:'',
        pageBtn:'',
        searchTotalItem:'',
        totalCount: 0,
        data: [],
        prevCurrentPage: 1,
        currentPage: 1,
        total: 9,
        bootstrapPaginationClasses: {
            ul: 'pagination',
            li: 'page-item',
            liActive: 'active',
            liDisable: 'disabled',
            button: 'page-link'
        },
        paginationAnchorTexts: {
            first: 'First',
            prev: 'Previous',
            next: 'Next',
            last: 'Last'
        }
    },
    methods:{
        fetchBeerData: function () {
            // this.baseUrl=`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}`
            fetch(this.baseUrl+`page=${this.page}&per_page=${this.perPage}`)
            .then(response => response.json())
            .then(data => this.result=data)
          },
          selectItemBtn: function() {
            let e = document.getElementById("select-items");
            this.perPage = e.value;
            console.log(this.perPage)
          },
          setPages: function () {
            this.totalPages = Math.ceil(this.totalItems / this.perPage);
            this.lastPage = this.totalPages;
          },
          filterItem: function(){
            if(this.searchItem){
                fetch(this.baseUrl+`beer_name=${this.searchItem}`)
                .then(response => response.json())
                .then(data=>{
                    this.searchTotalItem = data.length;
                    this.result=data;
                })
            }
          },
          listItemBtn: function(){
            if(this.pageBtn){
                fetch(this.baseUrl+`page=${this.pageBtn}&per_page=${this.perPage}`)
                .then(response => response.json())
                .then(data=>this.result=data)

                this.prevPage=parseInt(this.pageBtn)-1;
                this.nextPage=parseInt(this.pageBtn)+1;
                this.currentPage=this.pageBtn;
            }
          },
        totalItemCount: function(newPageCount=1) {

            this.data = fetch(`https://api.punkapi.com/v2/beers?page=${newPageCount}&per_page=80`)
                .then(response  =>  response.json())
                .then(data => {
                    return data
                })

            this.data.then((data)=>{
                if(data.length){
                    newPageCount += 1;
                    this.totalCount = parseInt(this.totalCount)+parseInt(data.length);
                    this.totalItemCount(newPageCount);

                }
            })

        }
    },
    created() {
        this.totalItemCount();
        this.fetchBeerData();
    },
    watch: {
        perPage () {
          this.setPages();
        },
        currentPage () {
            this.page = this.currentPage;
            this.fetchBeerData()
        }
    }
})



