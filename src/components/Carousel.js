import React from "react";
import Card from '../components/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import experience from "../assets/images/exp.jpeg";
import project from "../assets/images/proj.jpeg";
import achievement from "../assets/images/achiev.jpg";

class Carousel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                id: 0,
                title: "Experience",
                subTitle: "Your study or work experience",
                imgSrc: experience,
                path: "/experience",
                selected: false,
                },
                {
                id: 1,
                title: "Projects",
                subTitle: "Your projects",
                imgSrc: project,
                path: "/projects",
                selected: false,
                },
                {
                id: 2,
                title: "Achievement",
                subTitle: "Your achievement",
                imgSrc: achievement,
                path: "/achievement",
                selected: false,
                },
            ],
        };
    }

    handleCardClick = (id, card) => {
        let items = [...this.state.items];

        items[id].selected = items[id].selected ? false : true;

        items.forEach((item) => {
            if (item.id !== id) {
                item.selected = false;
            }
        });

        this.setState({
            items,
        });
    };

    makeItems = (items) => {
        return items.map(item => {
            return <Card item={item} click={(e => this.handleCardClick(item.id, e))} key={item.id} />
        })
    }

    render() {
        return (
        <Container fluid={true}>
            <Row className="justify-content-around">
                {this.makeItems(this.state.items)}
            </Row>
        </Container>
        );
    }
} 

export default Carousel;
