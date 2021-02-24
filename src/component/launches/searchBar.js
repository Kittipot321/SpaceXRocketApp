import { useEffect } from 'react'
import styled from 'styled-components'

const SearchBar = ({defaultLaunches, setLaunches, filter, setFilter, year, launches}) => {
    const {success, text, selectYear} = filter
    useEffect(() =>{
        setLaunches(launches.filter(value =>{
            const name = value.rocket.rocket_name+value.mission_name
            return name.toLowerCase().includes(text.toLowerCase())
        }))   
    }, [text])

    const yearFilter = (e) =>{
        filter.selectYear = e
        setFilter(filter)
        if(success === undefined){
            const currentSuccess = defaultLaunches.map((value) => {return value})
            setLaunches(
                e === "Oldest" ? currentSuccess.sort((a, b) => {return a.launch_year-b.launch_year}) 
                : e === "Latest" ? currentSuccess.sort((b, a) => {return a.launch_year-b.launch_year}) 
                : currentSuccess.filter((value) => value.launch_year == e)
            )
        }
        else{
            const currentSuccess = defaultLaunches.filter((value) => value.launch_success == success)
            setLaunches(
                e === "Oldest" ? currentSuccess.sort((a, b) => {return a.launch_year-b.launch_year}) 
                : e === "Latest" ? currentSuccess.sort((b, a) => {return a.launch_year-b.launch_year}) 
                : currentSuccess.filter((value) => value.launch_year == e)
            )
        }
    }

    const successFilter = () =>{    
        const currentYear = 
            selectYear === "Oldest" ? defaultLaunches.sort((a, b) => {return a.launch_year-b.launch_year}) 
            : selectYear === "Latest" ? defaultLaunches.sort((b, a) => {return a.launch_year-b.launch_year}) 
            : selectYear === "default" ? defaultLaunches 
            : defaultLaunches.filter((value) => value.launch_year == selectYear)

        if(success){
            const successSort = currentYear.filter((value) => value.launch_success === false)
            setLaunches(successSort)
            filter.success = false
            setFilter(filter)
        }
        else if(success === false){
            const successSort = currentYear
            setLaunches(successSort)
            filter.success = undefined
            setFilter(filter)
        }
        else{
            const successSort = currentYear.filter((value) => value.launch_success)
            setLaunches(successSort)
            filter.success = true
            setFilter(filter)
        }
    }

    const resetFilter = () =>{
        setFilter({success: undefined, text:"", selectYear: "default"})
        setLaunches(defaultLaunches)
    }

    return (
        <FilterDiv>
            <input type="text" placeholder="Search Rocket Name" onChange={e => setFilter({success: success, text:e.target.value, selectYear: selectYear})} value={filter.text}/>
            <div>
                Sort By :   
                <select name="slct" className="slct" onChange={(e) => yearFilter(e.target.value)} value={selectYear}>
                    <option selected value="default" disabled>Select Year</option>
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                    {year.map((value, index) => <option key={index} value={value}>{value}</option>)}
                </select>
                <button onClick={() => successFilter()} style={{background: success ? "rgb(78, 135, 72)" : success === false ? "rgb(199, 38, 38)" : "#111"}}>Launch Result : {success ? "Success" : success === false ? "Fail" : "Any"}</button>
                <button onClick={() => resetFilter()}>Clear</button>
            </div>       
        </FilterDiv>
    )
}

const FilterDiv = styled.div`
    padding: 20px 0 0 10px;
    color: #CCC;
    display: flex;
    flex-wrap: wrap;
    button, select{
        margin: 5px 10px;
        padding: 7px;
        background: none;
        color: #FFF;
        border-radius: 5px;
        border: 2px solid #333;
        transition:0.25s;
    }
    option{
        background: #333; 
        font-size: 1.05rem;
        border: none;
    }
    input{
        background: #333;
        padding: 10px;
        margin: 0 10px 10px 0px;
        border: none;
        color: #fff;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`

export default SearchBar