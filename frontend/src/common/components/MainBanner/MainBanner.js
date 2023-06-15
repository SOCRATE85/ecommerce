import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../hooks/use-alert";
import Hoc from "../../Hoc/Hoc";
import Banner from "../Carousel/Banner/Banner";
import MainBannerItem from "./MainBannerItem/MainBannerItem";
import { getSlider, clearErrors } from "../../../store";

const MainBanner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { slider, loading, error } = useSelector((state) => state.slider);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    dispatch(getSlider("6413291a33cedec097d553c4"));
  }, [dispatch]);

  if (loading || slider === null) {
    return <></>;
  }
  return (
    <Hoc>
      {slider.banners && slider.banners.length ? (
        <Banner autoPlay={true} showThumbs={false} showStatus={false}>
          {slider.banners.map((banner, index) => {
            return (
              <MainBannerItem
                key={index}
                banner={banner}
                link={banner.clickurl}
                alt={banner.name}
                legend={banner.description}
              />
            );
          })}
        </Banner>
      ) : (
        <div className="banner">
          <p className="font-size-16 font-weight-400">Welcome to Ecommerce</p>
          <h1 className="font-size-25 font-weight-600 text-white">
            Find Amazing Product Below
          </h1>
          <a href="#container">
            <button className="font-semibold">
              Scoll <CgMouse />
            </button>
          </a>
        </div>
      )}
    </Hoc>
  );
};

export default MainBanner;
