import type { GetStaticProps, NextPage } from "next";
import type { IndexContextType } from "../../contexts/IndexContext";
import { IndexContext } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import type { TagType } from "../../types/TagType";
import type { MediumType } from "../../types/MediumType";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { fetchTagList } from "../../logics/api/fetchTagList";
import AboutPageComponent from "../../components/about/AboutPageComponent";

export const getStaticProps: GetStaticProps = async () => {
  const [mediumDataList, tagDataList] = await Promise.all([
    fetchMedia(),
    fetchTagList(),
  ]);

  return {
    props: {
      mediumDataList,
      tagDataList,
    },
  };
};

const AboutPage: NextPage<{
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    mediumDataList,
    tagDataList,
    isSelectedAbout: true,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage pageTitle="自己紹介">
        <AboutPageComponent />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default AboutPage;
