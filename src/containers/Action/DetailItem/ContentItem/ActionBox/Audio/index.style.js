import styled from 'styled-components';

export default styled.div`
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  .container-title {
    display: flex;
    align-items: center;
  }
  .container-title > * {
    margin: 5px;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
  }
  .ant-space {
    width: 100%;
  }
  .ant-space .ant-space-item:nth-child(2) {
    flex-grow: 1;
  }
  .anticon {
    font-size: 20px;
    cursor: pointer;
  }
  .icon-delete {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
