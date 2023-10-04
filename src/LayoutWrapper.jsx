import Layout from "./app/components/layout/Layout";
import PrivateRoutes from "./app/utils/PrivateRoutes";

const LayoutWrapper = () => {
    return (
        <PrivateRoutes>
            <Layout />
        </PrivateRoutes>
    );
};

export default LayoutWrapper;
