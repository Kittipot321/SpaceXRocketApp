import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
const Launches = () => {
    const [launches, setLaunches] = useState([])
    const [defaultLaunches, setDefaultLaunches] = useState([])
    const [success, setSuccess] = useState(undefined)
    const [text, setText] = useState("")
    const [year, setYear] = useState(false)

    useEffect(
        () => {
            const fetchLaunches = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/launches')
                const data = await response.json()
                console.log(data)
                setLaunches(data)
                setDefaultLaunches(data)
            }
            fetchLaunches()
        }, []
    );

    useEffect(() =>{
        setLaunches(defaultLaunches.filter(value =>{
            return value.rocket.rocket_name.toLowerCase().includes(text.toLowerCase())
        }))
        console.log(launches)
    }, [text])
    const yearFilter = () =>{
        resetFilter() 
        if(year){
            const yearSorted = defaultLaunches.sort((a, b) => {return a.launch_year-b.launch_year})
            setLaunches([...yearSorted])
            filterUpdate(false, setYear)
        }
        else{
            const yearSorted = defaultLaunches.sort((a, b) => {return b.launch_year-a.launch_year})
            setLaunches([...yearSorted])
            filterUpdate(true, setYear)
        }
    }


    const nameFilter = defaultLaunches.filter(value =>{
        return value.rocket.rocket_name.toLowerCase().includes(text.toLowerCase())
    })


    const successFilter = () =>{
        resetFilter()
        if(success){
            const successSort = defaultLaunches.filter((value) => !value.launch_success)
            setLaunches(successSort)
            filterUpdate(false, setSuccess)
        }
        else if(success === false){
            const successSort = defaultLaunches
            setLaunches(successSort)
            filterUpdate(undefined, setSuccess)
        }
        else{
            const successSort = defaultLaunches.filter((value) => value.launch_success)
            setLaunches(successSort)
            filterUpdate(true, setSuccess)
        }
    }

    const filterUpdate = (update, setState) =>{
        setState(update)    
    }
    const resetFilter = () =>{
        setSuccess(undefined)
        setYear(false)
    }
    return (
        <Fragment>
            <DivContainer className="content-flex" style={{backgroundImage: `url(https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`}}>
                <div className="container">
                    <center><H1>LAUNCHES</H1></center>              
                </div> 
            </DivContainer>
            <div className="container">
                <FilterDiv>
                        <input type="text" placeholder="Search Rocket Name" onChange={e => setText(e.target.value)} value={text}/>
                        <div>
                            Sort By :            
                            <button onClick={() => yearFilter()} style={{ background: year ? "#EEE" : "transparent", color: year ? "#111" : "#EEE"}}>Launch Year</button>
                            <button onClick={() => successFilter()} style={{background: success ? "#11CC11" : success === false ? "#CC1111" : "#111"}}>Launch Result : {success ? "Success" : success === false ? "Fail" : "Any"}</button>
                        </div>       
                </FilterDiv>
                <FlexContainer>
                    { launches.length == 0 ?
                        <center><NoResult>No Result</NoResult></center>
                        
                        :
                        launches.map((value, index)=>{
                            return(
                                <Card key={index}>
                                    <center><img src={value.links.mission_patch_small} alt=""/></center>
                                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                        <h3>{value.rocket.rocket_name}</h3>
                                        <h3>{value.launch_year}</h3>
                                        {value.launch_success ? <h3 style={{color: "#11CC11"}}>Launch Success</h3> : <h3 style={{color: "#CC1111"}}>Launch Fail</h3>}
                                    </div>
                                </Card>    
                            )
                        })
                    }
                </FlexContainer>
            </div>
        </Fragment>
    )


}
const DivContainer = styled.div`
    padding: 300px 0;
    background-size: cover;
`
const H1 = styled.h1`
    font-size: 10.5vmin;
    color: #FFF;
    padding: 0;
`
const Card = styled.div`
    border-radius: 10px;
    background: #222;
    width: 400px;
    margin: 30px 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: 0.25s;
    display: flex;
    img{
        width: 200px;
        padding: 5px;
    }
    h3{
        color: #FFF;
        margin: 5px 0;
        padding: 0 10px;
        font-weight: 300;
    }
    :hover{
        background: #444;
    }
    
`
const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
`

const FilterDiv = styled.div`
    padding: 20px 0 0 10px;
    color: #CCC;
    display: flex;
    flex-wrap: wrap;
    button{
        margin: 5px 10px;
        padding: 7px;
        background: none;
        color: #FFF;
        border-radius: 5px;
        border: 2px solid #333;
        transition:0.25s;
    }
    input{
        background: #333;
        padding: 10px;
        margin: 0 10px 10px 10px;
        border: none;
        color: #fff;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`

const NoResult = styled.h1`
    font-size: 8vmin;
    font-weight: 300;
    color: #AAA; 
    padding: 70px 0;
`
export default Launches