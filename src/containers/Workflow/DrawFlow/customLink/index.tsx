import createEngine, {
  DefaultPortModel,
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultLinkWidget,
  DefaultPortModelOptions,
} from '@projectstorm/react-diagrams';
import {
  LinkModel,
  LinkWidget,
  PointModel,
  PointModelGenerics,
} from '@projectstorm/react-diagrams-core';
import {
  AbstractModelFactory,
  DeserializeEvent,
} from '@projectstorm/react-canvas-core';
import * as React from 'react';
import { MouseEvent } from 'react';

export class AdvancedLinkModel extends DefaultLinkModel {
  protected sourcePort: AdvancedPortModel | null;
  protected targetPort: AdvancedPortModel | null;
  constructor() {
    super({
      type: 'advanced',
      width: 3,
      color: 'rgb(0 0 0)',
    });
  }
  setSourcePort(port: AdvancedPortModel): void {
    if (port !== null) {
      port.addLink(this);
    }
    if (this.sourcePort && this.sourcePort !== null) {
      this.sourcePort.removeLink(this);
    }
    this.sourcePort = port;
    this.fireEvent({ port }, 'sourcePortChanged');
    if (port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
  getSourcePort(): AdvancedPortModel {
    return this.sourcePort;
  }
  getTargetPort(): AdvancedPortModel {
    return this.targetPort;
  }
  setTargetPort(port: AdvancedPortModel): void {
    if (port !== null) {
      port.addLink(this);
    }
    if (this.targetPort && this.targetPort !== null) {
      this.targetPort.removeLink(this);
    }
    this.targetPort = port;
    this.fireEvent({ port }, 'targetPortChanged');
    if (port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
}

export class AdvancedPortModel extends DefaultPortModel {
  constructor(options: DefaultPortModelOptions) {
    super(options);
  }
  createLinkModel(): AdvancedLinkModel | null {
    return new AdvancedLinkModel();
  }
  removeLink(link: AdvancedLinkModel): void {
    delete this.links[link.getID()];
  }
}

const CustomLinkArrowWidget = (props) => {
  const { point, previousPoint, color } = props;

  const angle =
    90 +
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x,
    ) *
      180) /
      Math.PI;
  //translate(50, -10),
  return (
    <g
      className="arrow"
      transform={
        'translate(' +
        point.getPosition().x +
        ', ' +
        point.getPosition().y +
        ')'
      }
    >
      <g style={{ transform: 'rotate(' + 180 + 'deg)' }}>
        <g transform={'translate(0, -3)'}>
          <polygon
            points="0,2 8,16 -8,16"
            fill={color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export class AdvancedLinkWidget extends DefaultLinkWidget {
  generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point as any}
        previousPoint={previousPoint as any}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }
  render() {
    //ensure id is present for all points on the path
    var points: PointModel[] = this.props.link.getPoints();
    var paths = [];
    this.refPaths = [];

    const typePort = points[0].getParent().getSourcePort().getName();

    const curvature = 6;
    const pointX1 = points[0].getX();
    const pointY1 = points[0].getY();
    const pointX2 = points[1].getX();
    const pointY2 = points[1].getY();
    const averageY = Math.abs(pointY1 + pointY2) / 2;
    const averageX = Math.abs(pointX1 + pointX2) / 2;
    const subY = Math.abs(pointY1 - pointY2);
    const subX = Math.abs(pointX1 - pointX2);
    const averageRangeXRight = (pointX1 + pointX2 - 167) / 2;
    const averageRangeXLeft = (pointX1 + pointX2 + 167) / 2;

    let path = '';
    if (pointX1 === pointX2 || pointY2 === pointY1) {
      path = LinkWidget.generateLinePath(points[0], points[1]);
    } else if (typePort !== 'out-bottom') {
      // nếu port không phải là bottom
      if (pointX2 > pointX1) {
        if (subY < 17.5 || pointY2 < pointY1) {
          path = `M${pointX1},${pointY1} L ${
            averageRangeXRight - curvature
          },${pointY1} T ${averageRangeXRight},${
            pointY1 - curvature
          } L ${averageRangeXRight},${pointY1 - subY - 100 + curvature} T ${
            averageRangeXRight + curvature
          },${pointY1 - subY - 100} L ${pointX2 - curvature},${
            pointY1 - subY - 100
          } T ${pointX2},${
            pointY1 - subY - 100 + curvature
          } L ${pointX2}, ${pointY2}`;
        } else {
          path = `M${pointX1},${pointY1} L ${
            pointX2 - curvature
          },${pointY1} T ${pointX2},${
            pointY1 + curvature
          } L ${pointX2}, ${pointY2}`;
        }
      } else {
        if (subY < 17.5 || pointY2 < pointY1) {
          path = `M${pointX1},${pointY1} L ${
            averageRangeXLeft + curvature
          },${pointY1} T ${averageRangeXLeft},${
            pointY1 - curvature
          } L ${averageRangeXLeft},${pointY1 - subY - 100 + curvature} T ${
            averageRangeXLeft - curvature
          },${pointY1 - subY - 100} L ${pointX2 + curvature},${
            pointY1 - subY - 100
          } T ${pointX2},${
            pointY1 - subY - 100 + curvature
          } L ${pointX2}, ${pointY2}`;
        } else {
          path = `M${pointX1},${pointY1} L ${
            pointX2 + curvature
          },${pointY1} T ${pointX2},${
            pointY1 + curvature
          } L ${pointX2}, ${pointY2}`;
        }
      }
    } else {
      // Nếu port là bottom 7
      if (subX <= 13) {
        if (subX <= 5) {
          path = `M${pointX1},${pointY1} L ${pointX1},${averageY} L ${pointX2},${averageY} L ${pointX2}, ${pointY2}`;
        } else if (pointX2 > pointX1) {
          if (subX <= 7.5) {
            path = `M${pointX1},${pointY1} L ${pointX1},${averageY - 4} T ${
              pointX1 + 4
            },${averageY} L ${pointX2 - 4},${averageY} T ${pointX2},${
              averageY + 4
            } L ${pointX2}, ${pointY2}`;
          } else {
            path = `M${pointX1},${pointY1} L ${pointX1},${averageY - 1} T ${
              pointX1 + 1
            },${averageY} L ${pointX2 - 1},${averageY} T ${pointX2},${
              averageY + 1
            } L ${pointX2}, ${pointY2}`;
          }
        } else {
          if (subX <= 7) {
            path = `M${pointX1},${pointY1} L ${pointX1},${averageY - 4} T ${
              pointX1 - 4
            },${averageY} L ${pointX2 + 4},${averageY} T ${pointX2},${
              averageY + 4
            } L ${pointX2}, ${pointY2}`;
          } else {
            path = `M${pointX1},${pointY1} L ${pointX1},${averageY - 1} T ${
              pointX1 - 1
            },${averageY} L ${pointX2 + 1},${averageY} T ${pointX2},${
              averageY + 1
            } L ${pointX2}, ${pointY2}`;
          }
        }
      } else if (pointX2 > pointX1) {
        // nếu children nằm bên phải parent
        if (subY < 36 || pointY2 < pointY1) {
          // nếu toạ độ Y của children nhở hơn parent hoặc hiệu khoảng cách nhỏ hơn 36
          path = `M${pointX1},${pointY1} L ${pointX1},${
            pointY1 + 50 - curvature
          } T ${pointX1 + curvature},${pointY1 + 50} L ${
            averageX - curvature
          },${pointY1 + 50} T ${averageX},${
            pointY1 + 50 - curvature
          } L ${averageX}, ${pointY1 - subY - 50 + curvature} T ${
            averageX + curvature
          }, ${pointY1 - subY - 50} L ${pointX2 - curvature}, ${
            pointY1 - subY - 50
          } T  ${pointX2}, ${
            pointY1 - subY - 50 + curvature
          } L ${pointX2}, ${pointY2}`;
        } else {
          path = `M${pointX1},${pointY1} L ${pointX1},${
            averageY - curvature
          } T ${pointX1 + curvature},${averageY} L ${
            pointX2 - curvature
          },${averageY} T ${pointX2},${
            averageY + curvature
          } L ${pointX2}, ${pointY2}`;
        }
      } else {
        // nếu children nằm bên trái parent
        if (subY < 36 || pointY2 < pointY1) {
          // nếu toạ độ Y của children nhở hơn parent hoặc hiệu khoảng cách nhỏ hơn 36
          path = `M${pointX1},${pointY1} L ${pointX1},${
            pointY1 + 50 - curvature
          } T ${pointX1 - curvature},${pointY1 + 50} L ${
            averageX + curvature
          },${pointY1 + 50} T ${averageX},${
            pointY1 + 50 - curvature
          } L ${averageX}, ${pointY1 - subY - 50 + curvature} T ${
            averageX - curvature
          }, ${pointY1 - subY - 50} L ${pointX2 + curvature}, ${
            pointY1 - subY - 50
          } T  ${pointX2}, ${
            pointY1 - subY - 50 + curvature
          } L ${pointX2}, ${pointY2}`;
        } else {
          path = `M${pointX1},${pointY1} L ${pointX1},${
            averageY - curvature
          } T ${pointX1 - curvature},${averageY} L ${
            pointX2 + curvature
          },${averageY} T ${pointX2},${
            averageY + curvature
          } L ${pointX2}, ${pointY2}`;
        }
      }
    }
    paths.push(
      this.generateLink(
        path,
        {
          'data-linkid': this.props.link.getID(),
          'data-point': 1,
          onMouseDown: (event: MouseEvent) => {
            // this.addPointToLink(event, 1 + 1); // todo xử lý khi click vào link
          },
        },
        1,
      ),
    );

    if (this.props.link.getTargetPort() !== null) {
      paths.push(this.generateArrow(points[1], points[0]));
    } else {
      paths.push(this.generatePoint(points[points.length - 1]));
    }

    return (
      <g data-default-link-test={this.props.link.getOptions().testName}>
        {paths}
      </g>
    );
  }
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
  constructor() {
    super('advanced');
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />
    );
  }
}
