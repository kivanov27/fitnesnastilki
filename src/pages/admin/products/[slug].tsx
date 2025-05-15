import { authOptions } from "@/lib/authOptions";
import { Product } from "@/types";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

interface AdminEditProductProps {
    product: Product;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    if (!session?.user?.isAdmin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const product = await prisma.product.findUnique({ where: { id: } });

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
};

const AdminEditProductPage = ({ product }: AdminEditProductProps) => {
    console.log(product);

    return (
        <div></div>
    );
};

export default AdminEditProductPage;
