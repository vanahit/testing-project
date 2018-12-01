
export  const Main = styled.div`
margin: auto;
max-width: 1920px;
font-size: 24px;
overflow: auto;
`; 

export const Header = styled.div`
position: relative;
width: 100%;   
height: 600px;		
background-image: url(${mainBackground});
background-position: center; 
background-repeat: no-repeat; 
background-size: cover;
box-sizing: border-box;
`;

export const GetStartedDiv = styled.div`
position: absolute;
bottom:0;
color: white;
width: 100%;   
min-height: ${props => props.height || '100px'};  
z-index: 1;
background-color: rgba(20, 18, 24, 0.75);
font-size: 24px;
box-sizing: border-box;	
`;

export const FlexRow = styled.div`
display: flex;
margin: 19px auto;
max-width: 1200px;
flex-direction: row;
justify-content: ${props => props.content || 'space-between'};  ;
flex-wrap: wrap;
box-sizing: border-box;

@media screen and (max-width: 1190px) {
    flex-direction: column;
    min-width: 100%;
}
`;

export const FlexChild = styled.div`
position: relative;
width: ${props => props.width || ''};
height: ${props => props.height || ''};    
box-sizing: border-box; 

@media screen and (max-width: 1190px) {
    margin: 20px 5px;
    max-width: 98%;
    min-width: 98%
}
`;

export const GetsStartedText = styled.span`
font-size: 24px;
`;

export const Button = styled.button`
margin: 0 16px;
width: ${props => props.width || ''};  
height: 60px;
border: 0;
border-radius: 4px;
padding: 16px;
background-color:rgba(255, 89, 89, 1);
color: white;
font-weight: bold;
font-size: 18px;
box-sizing: border-box;
`;
export const Title = styled.div`
width: 100%;
margin-top: 76px;
margin-bottom: 30px;
font-size: ${props => props.size || '34px'};  
font-weight: bold;
color:rgba(79, 157, 166, 1);
border-bottom: 1px solid rgba(220, 220, 220, 1);
`;


export const Description = styled.div`
font-size: 20px;
color: #100529;
`;