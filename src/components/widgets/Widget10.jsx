import {
  Badge,
  Avatar,
  Portlet,
  RichList,
  CarouselItem,
  Widget6
} from "@blueupcode/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Carousel from "@blueupcode/slick"
import Image from "next/image"

class Widget10Component extends Component {
  state = {
    // Carousel element references
    carousel: {
      main: null,
      nav: null
    },
    // Carousel content data
    data: [
      {
        job: "Software Engineer",
        office: "San Francisco",
        employees: [
          {
            image: "/images/avatar/blank.webp",
            name: "Angelica Ramos",
            earning: "$162,700",
            change: "+$17",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Airi Satou",
            earning: "$433,060",
            change: "-$127",
            color: "danger"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Colleen Hurst",
            earning: "$205,500",
            change: "+$56",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Brielle Williamson",
            earning: "$86,000",
            change: "+$6",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Garrett Winters",
            earning: "$327,900",
            change: "-$25",
            color: "danger"
          }
        ]
      },
      {
        job: "Javascript Developer",
        office: "Singapore",
        employees: [
          {
            image: "/images/avatar/blank.webp",
            name: "Airi Satou",
            earning: "$433,060",
            change: "-$127",
            color: "danger"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Angelica Ramos",
            earning: "$162,700",
            change: "+$17",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Garrett Winters",
            earning: "$327,900",
            change: "-$25",
            color: "danger"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Brielle Williamson",
            earning: "$86,000",
            change: "+$6",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Colleen Hurst",
            earning: "$205,500",
            change: "+$56",
            color: "success"
          }
        ]
      },
      {
        job: "Marketing Designer",
        office: "Edinburgh",
        employees: [
          {
            image: "/images/avatar/blank.webp",
            name: "Airi Satou",
            earning: "$433,060",
            change: "-$127",
            color: "danger"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Colleen Hurst",
            earning: "$205,500",
            change: "+$56",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Brielle Williamson",
            earning: "$86,000",
            change: "+$6",
            color: "success"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Garrett Winters",
            earning: "$327,900",
            change: "-$25",
            color: "danger"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Angelica Ramos",
            earning: "$162,700",
            change: "+$17",
            color: "success"
          }
        ]
      }
    ]
  }

  componentDidMount() {
    // Set the carousels references
    this.setState({
      ...this.state,
      carousel: {
        main: this.mainRef,
        nav: this.navRef
      }
    })
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faFunnelDollar} />
          </Portlet.Icon>
          <Portlet.Title>Employee salary</Portlet.Title>
        </Portlet.Header>
        {/* BEGIN Carousel */}
        <Carousel
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          centerMode={true}
          asNavFor={this.state.carousel.nav}
          ref={(ref) => (this.mainRef = ref)}
          className="my-3"
        >
          {this.state.data.map((data, index) => {
            const { job, office } = data

            return (
              <CarouselItem key={index}>
                {/* BEGIN Widget */}
                <Widget6>
                  <Widget6.Title>{job}</Widget6.Title>
                  <Widget6.Subtitle>{office}</Widget6.Subtitle>
                </Widget6>
                {/* END Widget */}
              </CarouselItem>
            )
          })}
        </Carousel>
        {/* END Carousel */}
        <Portlet.Body>
          {/* BEGIN Carousel */}
          <Carousel
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            asNavFor={this.state.carousel.main}
            ref={(ref) => (this.navRef = ref)}
          >
            {this.state.data.map((data, index) => (
              <CarouselItem key={index}>
                {/* BEGIN Rich List */}
                <RichList>
                  {data.employees.map((data, index) => {
                    const { image, name, earning, color, change } = data

                    return (
                      <RichList.Item key={index}>
                        <RichList.Addon addonType="prepend">
                          {/* BEGIN Avatar */}
                          <Avatar display>
                            <Image
                              src={image}
                              layout="fill"
                              alt="Avatar image"
                            />
                          </Avatar>
                          {/* END Avatar */}
                        </RichList.Addon>
                        <RichList.Content>
                          <RichList.Title>{name}</RichList.Title>
                          <RichList.Subtitle>{earning}</RichList.Subtitle>
                        </RichList.Content>
                        <RichList.Addon addonType="append">
                          <Badge size="xl" variant={`label-${color}`}>
                            {change}
                          </Badge>
                        </RichList.Addon>
                      </RichList.Item>
                    )
                  })}
                </RichList>
                {/* END Rich List */}
              </CarouselItem>
            ))}
          </Carousel>
          {/* END Carousel */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget10Component
