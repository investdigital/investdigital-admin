import React from 'react';
import Moment from 'react-moment';

export default () => {
	return (
		<div className="welcomebgc">
			<section className="content-header"><h1></h1></section>
			<section className="content">
			<div className="row">
				<div className="md-col-12 text-center welcometitle">
					<h1>欢迎进入后台管理系统</h1>
					<div>现在时间是: <Moment locale="zh-cn" format="lll"></Moment></div>
					<div className="world">
						<img className="worldimg" src="../../screenshot/world.png" alt=""/>
					</div>
				</div>
			</div>
			</section>
		</div>
	);
};