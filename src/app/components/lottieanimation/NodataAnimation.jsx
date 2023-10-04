import { useLottie } from "lottie-react";
import nodata from "../../assets/lottie_animation/nodata/noda.json";
export const NodataAnimation = () => {
    const options = {
        animationData: nodata,
        loop: true,
        autoplay: true,
    };
    const { View } = useLottie(options);

    return (
        <div
            style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
            }}
        >
            {View}
        </div>
    );
};
