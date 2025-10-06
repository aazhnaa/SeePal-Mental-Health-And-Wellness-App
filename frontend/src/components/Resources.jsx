import TherapistCard from '../components/TherapistCard';
import ArticleCard from '../components/ArticleCard';
import {axiosInstance} from '../lib/axios'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
const Resources = () => {
  
  const [therapists, setTherapists] = useState([]);

  useEffect(()=>{
    const getTherapists = async() => {
      try {
        const res = await axiosInstance.get('/therapists');
        setTherapists(res.data);
        //console.log("therapists : ", therapists);
      } catch (error) {
        console.log("error in fetching therapists : ", error);
      }
    }
    getTherapists();
  },[])

  // const therapists = [
  //       {
  //           id:1,
  //           image :'./therapist.png',
  //           name : 'Dr. Ananya Mehra',
  //           license : 'Licensed Clinical Psychologist (RCI Registered)',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil Clinical Psychology'
  //           ]
  //       },
  //       {
  //           id:2,
  //           image :'./therapist2.jpg',
  //           name : 'Dr. Priya Sethi',
  //           license : 'Licensed Clinical Psychologist , RCI Registration No: A12345',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil (Clinical Psychology)'
  //           ]
  //       },
  //       {
  //           id:3,
  //           image :'./therapist.png',
  //           name : 'Dr. Ananya Mehra',
  //           license : 'Licensed Clinical Psychologist (RCI Registered)',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil Clinical Psychology'
  //           ]
  //       },
  //       {
  //           id:4,
  //           image :'./therapist2.jpg',
  //           name : 'Dr. Priya Sethi',
  //           license : 'Licensed Clinical Psychologist , RCI Registration No: A12345',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil (Clinical Psychology)'
  //           ]
  //       },
  //       {
  //           id:5,
  //           image :'./therapist.png',
  //           name : 'Dr. Ananya Mehra',
  //           license : 'Licensed Clinical Psychologist (RCI Registered)',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil Clinical Psychology'
  //           ]
  //       },
  //       {
  //           id:6,
  //           image :'./therapist2.jpg',
  //           name : 'Dr. Priya Sethi',
  //           license : 'Licensed Clinical Psychologist , RCI Registration No: A12345',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil (Clinical Psychology)'
  //           ]
  //       },
  //       {
  //           id:7,
  //           image :'./therapist.png',
  //           name : 'Dr. Ananya Mehra',
  //           license : 'Licensed Clinical Psychologist (RCI Registered)',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil Clinical Psychology'
  //           ]
  //       },
  //       {
  //           id:8,
  //           image :'./therapist2.jpg',
  //           name : 'Dr. Priya Sethi',
  //           license : 'Licensed Clinical Psychologist , RCI Registration No: A12345',
  //           degree : [
  //               'M.A. Psychology',
  //               'M.Phil (Clinical Psychology)'
  //           ]
  //       }
  //   ]

  const articles = [
    {
      id:1,
      image:'./cover.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:2,
      image:'./cover2.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:3,
      image:'./cover.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:4,
      image:'./cover2.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:5,
      image:'./cover.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:6,
      image:'./cover2.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:7,
      image:'./cover.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
    {
      id:8,
      image:'./cover2.png',
      name:'Cure Mind',
      description:'Practical tips and gentle guidance to help you heal, grow, and strengthen your mental well-being.'
    },
  ]

  // if(arePostsLoading)
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center"> 
        <div className="border-b w-full flex flex-col items-center">
          <div className=" w-4/5 p-6 flex flex-col gap-4 border-b">
            <h1 className="font-poppins-bold text-4xl font-bold text-gray-800">
              Connect
            </h1>
            <p className="font-poppins text-xl text-gray-600 ">
              Find the right support for your mental wellness journey.
            </p>
            {/* <div className="w-full flex gap-1 justify-center items-center">
            {therapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div> */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              modules={[Pagination, Navigation]}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full my-swiper"
            >
              {therapists.map((therapist) => (
                <SwiperSlide key={therapist._id} className="flex justify-center">
                  <TherapistCard therapist={therapist} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="articles-section h-fit w-4/5 bg-red p-6 flex flex-col gap-6 border-b">
          <h1 className="font-poppins-bold text-4xl font-bold text-gray-800">
            Artciles
          </h1>
          <p className="font-poppins text-lg text-gray-600 ">
            Discover a collection of thoughtful articles that explore mental
            health, self-care, and emotional wellbeing. Each piece is crafted to
            provide you with valuable insights, helpful strategies, and
            compassionate support to help you navigate your mental health
            journey with confidence.
          </p>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full my-swiper"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id} className="flex justify-center">
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <div className="flex flex-wrap gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Resources
