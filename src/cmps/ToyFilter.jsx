export function ToyFilter(){
    return <section>
    <div className="search">
      <p>Search:</p>  
      <input type="text"/>
      <div className="flex" ><input type="checkbox"/> <p>Only In Stock</p></div>
      <select name="" id="">

      </select>

    </div>
    <div className="sort">
        <p>Sort By:</p>
        <select name="" id="">
            <option value="createAt">New</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
    </div>
    </section>
}