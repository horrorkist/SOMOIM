import { API_ENDPOINT } from "@/App";
import FloatButton from "@/components/FloatButton";
import Overlay from "@/components/Overlay";
import useAccessToken from "@/hooks/useAccessToken";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import HeaderBackButton from "@/components/HeaderBackButton";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import Avatar from "@/components/Avatar";
import formatDate from "@/util/formatDate";
import useUser from "@/hooks/useUser";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function ClubGallery({
  isMember,
  isManager,
}: {
  isMember: boolean;
  isManager: boolean;
}) {
  const [detail, setDetail] = useState<any>(null);
  const [layoutId, setLayoutId] = useState<string | null>(null);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { clubId } = useParams();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const token = useAccessToken();
  const {
    data: albums,
    isLoading: albumsLoading,
    mutate,
  } = useSWR([`clubs/${clubId}/albums`, token]);
  const { user } = useUser();

  const onCloseUp = (album: any) => {
    setDetail(album);
    setLayoutId(album.id);
  };

  const onDismiss = () => {
    setDetail(null);
    setLayoutId(null);
    setShowNav(false);
  };

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    // to do : validate token

    fetch(`${API_ENDPOINT}/clubs/albums/${detail.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      mutate();
      onDismiss();
    });
  };

  useEffect(() => {
    if (albumsLoading) setShowSkeleton(true);
    else {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  }, [albumsLoading]);

  if (showSkeleton) {
    return (
      <ul className="grid grid-cols-2 gap-2 w-full p-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <li key={i} className="bg-gray-300 aspect-video animate-pulse"></li>
        ))}
      </ul>
    );
  }

  if (albums && albums.data.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center h-full p-4">
          <div className="text-gray-400 text-lg">
            제일 먼저 사진을 올려보세요!
          </div>
        </div>
        {isMember && (
          <div className="absolute bottom-8 right-8">
            {isMember && (
              <FloatButton to="upload">
                <FontAwesomeIcon icon={faCamera} />
              </FloatButton>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {layoutId && (
          <Overlay onClick={onDismiss}>
            <div className="relative h-full flex items-center">
              {showNav && (
                <PageHeader>
                  <div className="flex space-x-4 items-center">
                    <HeaderBackButton onClick={() => setShowNav(false)} />
                    <h2 className="text-xl">사진</h2>
                  </div>
                  {user && user.id === detail.userId && (
                    <div onClick={onDelete} className="cursor-pointer">
                      <FontAwesomeIcon icon={faTrashCan} size="xl" />
                    </div>
                  )}
                </PageHeader>
              )}
              <motion.div
                layoutId={layoutId}
                className="w-full h-min flex justify-center items-center rounded-lg overflow-hidden"
              >
                <img
                  src={detail.imageUrl + "/gallery"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNav((prev) => !prev);
                  }}
                />
              </motion.div>
              {showNav && (
                <BottomTabNavigator>
                  <div className="flex w-full justify-between px-4">
                    <div className="flex space-x-2 items-center">
                      <div className="w-12 aspect-square rounded-full flex justify-center items-center">
                        <Avatar size="lg" src={detail.userImg} />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p>{detail.userName}</p>
                        <p className="text-gray-400 text-sm">
                          {formatDate(detail.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </BottomTabNavigator>
              )}
            </div>
          </Overlay>
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-2 gap-2 w-full p-4">
        {albums &&
          albums.ok &&
          albums.data.map((album: any) => (
            <motion.li
              key={album.id}
              layoutId={album.id}
              onClick={() => onCloseUp(album)}
              className="aspect-video border hover:border-blue-500"
            >
              <img
                src={album.imageUrl + "/gallery"}
                className="object-cover h-full w-full"
              />
            </motion.li>
          ))}
      </ul>
      <div className="absolute bottom-8 right-8">
        {isMember && (
          <FloatButton to="upload">
            <FontAwesomeIcon icon={faCamera} />
          </FloatButton>
        )}
      </div>
    </>
  );
}
