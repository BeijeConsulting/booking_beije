import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';

const paginationArrowsRender = (_, type, originalElement) => {
   let iconsStyle = { fontSize: '1.7rem', color: '#FFF9F5' };
   if (type === 'prev') return <LeftCircleFilled style={iconsStyle} />;
   if (type === 'next') return <RightCircleFilled style={iconsStyle} />;
   return originalElement;
};

export {
   paginationArrowsRender
}