import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { H5 } from "../typo/typography";
// import CleanerRequestCard from "./CleanerRequestCard";
import CleanerRequestCard from "./CleanerRequestCard ";

export default function AllCleaner({ propertyData }) {
  const { t } = useTranslation();

  const handleAccept = (item) => {
    console.log(t("cleaner_requests.accepted"), item.name);
  };

  const handleDelete = (item) => {
    console.log(t("cleaner_requests.deleted"), item.name);
  };

  if (!propertyData?.cleaner_request?.length) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <H5 style={{ marginBottom: 15 }}>
        {t("cleaner_requests.title")} ({propertyData.cleaner_request.length})
      </H5>

      {propertyData.cleaner_request.map((item) => (
        <CleanerRequestCard
          key={item.id.toString()}
          propertyData={item}
          location={`${propertyData.city || ''}, ${propertyData.country || ''}`}
          onAccept={handleAccept}
          onDelete={handleDelete}
        />
      ))}
    </View>
  );
}
