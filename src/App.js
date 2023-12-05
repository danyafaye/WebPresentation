import "./App.css";
import {
  Button,
  Card,
  Divider,
  Flex,
  Input,
  Select,
  Space,
  Tooltip,
} from "antd";
import { Image } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Card as ChakraCard,
  CardHeader,
  CardBody,
  Heading,
  ChakraProvider,
  Box,
  Image as ChakraImage,
  Divider as ChakraDivider,
  AbsoluteCenter,
  Stack,
  Button as ChakraButton,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { wrap } from "@motionone/utils";
import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { EmailIcon, PhoneIcon, SettingsIcon } from "@chakra-ui/icons";
const { Option } = Select;

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

function App() {
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com">
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [value, setValue] = useState(["a10", "c12", "h17", "j19", "k20"]);
  const options2 = [];

  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options2.push({
      label: `Long Label: ${value}`,
      value,
    });
  }
  const selectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value,
    options: options2,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: "Выберите",
    maxTagCount: "responsive",
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="App">
      <div style={{ fontSize: "24px", fontWeight: "600" }}>
        Создание визуальных эффектов с использованием библиотек JavaScript
      </div>
      <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "600" }}>
        Библиотеки UI компонентов
      </div>
      <Card
        style={{ marginTop: "10px", marginBottom: "10px" }}
        title="Ant Design"
      >
        <div className="antd-card-wrapper">
          <Image
            preview={false}
            src="https://www.specbee.com/sites/default/files/inline-images/Ant.png"
          />
          <div className="antd-text-wrapper">
            <div>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>Плюсы</div>
              <ul className="antd-list-wrapper">
                <li>
                  <b>Комплексность:</b> Предоставляет широкий спектр готовых
                  компонентов, иконок и стилей.
                </li>
                <li>
                  <b>Гибкость настройки:</b> Возможность настраивать компоненты
                  благодаря обширному списку аттрибутов и параметров.
                </li>
                <li>
                  <b>Сообщество и поддержка:</b> Активное сообщество и отличная
                  документация.
                </li>
              </ul>
            </div>
            <Divider />
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "600" }}>Минусы</h4>
              <ul className="antd-list-wrapper">
                <li>
                  <b>Размер:</b> Большой объем компонентов может увеличить
                  размер конечного пакета приложения.
                </li>
                <li>
                  <b>Кастомизация стилей:</b> Иногда сложно изменить стили
                  компонентов, отличные от предустановленных.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider>Примеры</Divider>
        <div
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          Button
        </div>
        <div className="antd-button-wrapper">
          <div className="antd-button-default">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Flex gap="small" wrap="wrap">
                <Button type="primary">Кнопка с типом primary</Button>
                <Button>Кнопка со стилями по-умолчанию</Button>
                <Button type="dashed">Кнопка с пунктирной линией</Button>
                <Button type="text">Кнопка с типом text</Button>
                <Button type="link">Кнопка-ссылка</Button>
              </Flex>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { Button, Flex } from 'antd';

const App = () => (
  <Flex gap="small" wrap="wrap">
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
);

export default App;`}
              </Card>
            </pre>
          </div>
          <div className="antd-button-icon">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Flex gap="small" vertical>
                <Flex wrap="wrap" gap="small">
                  <Tooltip title="поиск">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                  <Button type="primary" shape="circle">
                    A
                  </Button>
                  <Button type="primary" icon={<SearchOutlined />}>
                    Поиск
                  </Button>
                  <Tooltip title="поиск">
                    <Button shape="circle" icon={<SearchOutlined />} />
                  </Tooltip>
                  <Button icon={<SearchOutlined />}>Поиск</Button>
                </Flex>
                <Flex wrap="wrap" gap="small">
                  <Tooltip title="поиск">
                    <Button shape="circle" icon={<SearchOutlined />} />
                  </Tooltip>
                  <Button icon={<SearchOutlined />}>Поиск</Button>
                  <Tooltip title="поиск">
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                  <Button type="dashed" icon={<SearchOutlined />}>
                    Поиск
                  </Button>
                  <Button
                    icon={<SearchOutlined />}
                    href="https://www.google.com"
                  />
                </Flex>
              </Flex>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

const App = () => (
  <Flex gap="small" vertical>
    <Flex wrap="wrap" gap="small">
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="primary" shape="circle">
        A
      </Button>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
    </Flex>
    <Flex wrap="wrap" gap="small">
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
      <Tooltip title="search">
        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="dashed" icon={<SearchOutlined />}>
        Search
      </Button>
      <Button icon={<SearchOutlined />} href="https://www.google.com" />
    </Flex>
  </Flex>
);

export default App;
`}
              </Card>
            </pre>
          </div>
        </div>
        <div
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          Input
        </div>
        <div className="antd-button-wrapper">
          <div className="antd-button-default">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Space direction="vertical">
                <Input placeholder="Базовый вариант" />
                <Input placeholder="Без обводки" bordered={false} />
                <Input.Password placeholder="Вариант для ввода пароля" />
              </Space>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { Space, Input } from 'antd';

const App = () => (
  <Space direction="vertical">
    <Input placeholder="Базовый вариант" />
    <Input placeholder="Без обводки" bordered={false} />
    <Input.Password placeholder="Вариант для ввода пароля" />
  </Space>
);

export default App;`}
              </Card>
            </pre>
          </div>
          <div className="antd-button-icon">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Space direction="vertical">
                <Input
                  addonBefore={selectBefore}
                  addonAfter={selectAfter}
                  defaultValue="mysite"
                />
                <Input
                  addonAfter={<SettingOutlined />}
                  defaultValue="инпут с иконкой"
                />
                <Input
                  addonBefore="http://"
                  suffix=".com"
                  defaultValue="mysite"
                />
                <Input prefix="₽" suffix="RUB" />
              </Space>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input, Select, Space } from 'antd';

const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com">
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

const App = () => (
    <Space direction="vertical">
      <Input
        addonBefore={selectBefore}
        addonAfter={selectAfter}
        defaultValue="mysite"
      />
      <Input addonAfter={<SettingOutlined />} defaultValue="инпут с иконкой" />
      <Input
        addonBefore="http://"
        suffix=".com"
        defaultValue="mysite"
      />
      <Input prefix="₽" suffix="RUB" />
    </Space>
);

export default App;
`}
              </Card>
            </pre>
          </div>
        </div>
        <div
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          Select
        </div>
        <div className="antd-button-wrapper">
          <div className="antd-button-default">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Space wrap>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  allowClear
                  options={[{ value: "lucy", label: "Lucy" }]}
                />
                <Select
                  showSearch
                  placeholder="Выбери человека"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Space>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value) => {
  console.log(value);
};

const onChange = (value) => {
  console.log(value);
};
const onSearch = (value) => {
  console.log(value);
};

// Filter \`option.label\` match the user type \`input\`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const App = () => (
              <Space wrap>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  allowClear
                  options={[{ value: "lucy", label: "Lucy" }]}
                />
                <Select
                  showSearch
                  placeholder="Выбери человека"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Space>
);

export default App;`}
              </Card>
            </pre>
          </div>
          <div className="antd-button-icon">
            <Card style={{ borderRadius: "8px 8px 0 0" }}>
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Пожалуйста, выберите"
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  options={options}
                />
                <Select {...selectProps} />
              </Space>
            </Card>
            <pre style={{ margin: "0" }}>
              <Card style={{ borderRadius: "0 0 8px 8px" }}>
                {`import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Space, Select, Tooltip } from 'antd';

const handleChange = (value) => {
  console.log(value);
};

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [value, setValue] = useState(["a10", "c12", "h17", "j19", "k20"]);
  const options2 = [];

  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options2.push({
      label: Long Label: value,
      value,
    });
  }
  const selectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value,
    options: options2,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: "Выберите",
    maxTagCount: "responsive",
  };

const App = () => (
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Пожалуйста, выберите"
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  options={options}
                />
                <Select {...selectProps} />
              </Space>
);

export default App;
`}
              </Card>
            </pre>
          </div>
        </div>
      </Card>
      <ChakraProvider>
        <ChakraCard>
          <CardHeader>
            <Heading>Chakra UI</Heading>
          </CardHeader>
          <CardBody>
            <div className="antd-card-wrapper">
              <Box
                style={{ display: "flex", alignItems: "center" }}
                boxSize="sm"
              >
                <ChakraImage src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true" />
              </Box>
              <div className="antd-text-wrapper">
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>
                    Плюсы
                  </div>
                  <ul className="antd-list-wrapper">
                    <li>
                      <b>Простота использования:</b> Имеет интуитивный API и
                      удобные компоненты, что упрощает процесс разработки.
                    </li>
                    <li>
                      <b>Тёмная тема из коробки:</b> Предоставляет поддержку
                      тёмной темы без необходимости дополнительной настройки.
                    </li>
                    <li>
                      <b>Поддержка реактивных стилей:</b> Использует стилизацию,
                      основанную на пропсах, что позволяет легко изменять
                      компоненты.
                    </li>
                  </ul>
                </div>
                <ChakraDivider
                  colorScheme="teal"
                  style={{ borderBottomWidth: "2px", borderColor: "teal" }}
                />
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
                    Минусы
                  </h4>
                  <ul className="antd-list-wrapper">
                    <li>
                      <b>Недостаток готовых компонентов:</b> Может не
                      предоставлять такой широкий выбор готовых элементов, как
                      другие библиотеки.
                    </li>
                    <li>
                      <b>Ограниченность кастомизации:</b> В некоторых случаях
                      сложно изменить стили компонентов.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Box position="relative" padding="10">
              <ChakraDivider />
              <AbsoluteCenter bg="white" px="4">
                Примеры
              </AbsoluteCenter>
            </Box>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Button
            </div>
            <div className="antd-button-wrapper">
              <div className="antd-button-default">
                <ChakraCard
                  style={{ padding: "20px", borderRadius: "8px 8px 0 0" }}
                >
                  <Stack direction="row" spacing={4} align="center">
                    <ChakraButton colorScheme="teal" variant="solid">
                      Кнопка с заполнением
                    </ChakraButton>
                    <ChakraButton colorScheme="teal" variant="outline">
                      Кнопка с border
                    </ChakraButton>
                    <ChakraButton colorScheme="teal" variant="ghost">
                      Кнопка
                    </ChakraButton>
                    <ChakraButton colorScheme="teal" variant="link">
                      Ссылка
                    </ChakraButton>
                  </Stack>
                </ChakraCard>
                <pre style={{ margin: "0" }}>
                  <ChakraCard
                    style={{ padding: "20px", borderRadius: "0 0 8px 8px" }}
                  >
                    {`<Stack direction='row' spacing={4} align='center'>
  <Button colorScheme='teal' variant='solid'>
    Кнопка с заполнением
  </Button>
  <Button colorScheme='teal' variant='outline'>
    Кнопка с border
  </Button>
  <Button colorScheme='teal' variant='ghost'>
    Кнопка
  </Button>
  <Button colorScheme='teal' variant='link'>
    Ссылка
  </Button>
</Stack>`}
                  </ChakraCard>
                </pre>
              </div>
              <div className="antd-button-icon">
                <ChakraCard
                  style={{ padding: "20px", borderRadius: "8px 8px 0 0" }}
                >
                  <Stack direction="row" spacing={4}>
                    <ChakraButton
                      leftIcon={<EmailIcon />}
                      colorScheme="teal"
                      variant="solid"
                    >
                      Эл. почта
                    </ChakraButton>
                    <ChakraButton
                      leftIcon={<SettingsIcon />}
                      colorScheme="pink"
                      variant="solid"
                    >
                      Настройки
                    </ChakraButton>
                    <ChakraButton
                      rightIcon={<PhoneIcon />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Позвоните нам
                    </ChakraButton>
                  </Stack>
                </ChakraCard>
                <pre style={{ margin: "0" }}>
                  <ChakraCard
                    style={{ padding: "20px", borderRadius: "0 0 8px 8px" }}
                  >
                    {`<Stack direction='row' spacing={4}>
  <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid'>
    Эл. почта
  </Button>
  <Button leftIcon={<MdBuild />} colorScheme='pink' variant='solid'>
    Настройки
  </Button>
  <Button rightIcon={<MdCall />} colorScheme='blue' variant='outline'>
    Позвоните нам
  </Button>
</Stack>
`}
                  </ChakraCard>
                </pre>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Input
            </div>
            <div className="antd-button-wrapper">
              <div className="antd-button-default">
                <ChakraCard
                  style={{ padding: "20px", borderRadius: "8px 8px 0 0" }}
                >
                  <Stack spacing={4}>
                    <ChakraInput placeholder="Базовый вариант" />
                    <ChakraInput
                      variant="unstyled"
                      placeholder="Вариант без обводки"
                    />
                    <InputGroup size="md">
                      <ChakraInput
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Вариант с вводом пароля"
                      />
                      <InputRightElement width="4.5rem">
                        <ChakraButton
                          h="1.75rem"
                          size="sm"
                          width="120px"
                          onClick={handleClick}
                        >
                          {show ? "Скрыть" : "Показать"}
                        </ChakraButton>
                      </InputRightElement>
                    </InputGroup>
                  </Stack>
                </ChakraCard>
                <pre style={{ margin: "0" }}>
                  <ChakraCard
                    style={{ padding: "20px", borderRadius: "0 0 8px 8px" }}
                  >
                    {`const [show, setShow] = React.useState(false)
const handleClick = () => setShow(!show)
return(<Stack spacing={4}>
<Input placeholder="Базовый вариант" />
<Input
  variant="unstyled"
  placeholder="Вариант без обводки"
/>
<InputGroup size="md">
  <Input
    pr="4.5rem"
    type={show ? "text" : "password"}
    placeholder="Вариант с вводом пароля"
  />
  <InputRightElement width="4.5rem">
    <Button
      h="1.75rem"
      size="sm"
      width="120px"
      onClick={handleClick}
    >
      {show ? "Скрыть" : "Показать"}
    </Button>
  </InputRightElement>
</InputGroup>
</Stack>
)
                  `}
                  </ChakraCard>
                </pre>
              </div>
              <div className="antd-button-icon">
                <ChakraCard
                  style={{ padding: "20px", borderRadius: "8px 8px 0 0" }}
                >
                  <Stack spacing={4}>
                    <InputGroup>
                      <InputLeftAddon children="+234" />
                      <ChakraInput type="tel" placeholder="Мобильный телефон" />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon children="https://" />
                      <ChakraInput placeholder="mysite" />
                      <InputRightAddon children=".com" />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <PhoneIcon color="gray.300" />
                      </InputLeftElement>
                      <ChakraInput type="tel" placeholder="Phone number" />
                    </InputGroup>
                  </Stack>
                </ChakraCard>
                <pre style={{ margin: "0" }}>
                  <ChakraCard
                    style={{ padding: "20px", borderRadius: "0 0 8px 8px" }}
                  >
                    {`<Stack spacing={4}>
                     <InputGroup>
                       <InputLeftAddon children="+234" />
                       <Input
                         type="tel"
                         placeholder="Мобильный телефон"
                       />
                     </InputGroup>
                     <InputGroup size="sm">
                       <InputLeftAddon children="https://" />
                       <Input placeholder="mysite" />
                       <InputRightAddon children=".com" />
                     </InputGroup>
                     <InputGroup>
                       <InputLeftElement pointerEvents="none">
                         <PhoneIcon color="gray.300" />
                       </InputLeftElement>
                       <Input type="tel" placeholder="Phone number" />
                     </InputGroup>
</Stack>
`}
                  </ChakraCard>
                </pre>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Select
            </div>
            <div className="antd-button-wrapper">
              <div className="antd-button-default">
                <ChakraCard
                  style={{ padding: "20px", borderRadius: "8px 8px 0 0" }}
                >
                  <Stack direction="row" spacing={4} align="center">
                    <ChakraSelect placeholder="Выберите опцию">
                      <option value="option1">Опция 1</option>
                      <option value="option2">Опция 2</option>
                      <option value="option3">Опция 3</option>
                    </ChakraSelect>
                    <ChakraSelect
                      variant="flushed"
                      placeholder="Выберите опцию"
                    >
                      <option value="option1">Опция 1</option>
                      <option value="option2">Опция 2</option>
                      <option value="option3">Опция 3</option>
                    </ChakraSelect>
                  </Stack>
                </ChakraCard>
                <pre style={{ margin: "0" }}>
                  <ChakraCard
                    style={{ padding: "20px", borderRadius: "0 0 8px 8px" }}
                  >
                    {`<Stack direction="row" spacing={4} align="center">
                    <Select placeholder="Выберите опцию">
                      <option value="option1">Опция 1</option>
                      <option value="option2">Опция 2</option>
                      <option value="option3">Опция 3</option>
                    </Select>
                    <Select
                      variant="flushed"
                      placeholder="Выберите опцию"
                    >
                      <option value="option1">Опция 1</option>
                      <option value="option2">Опция 2</option>
                      <option value="option3">Опция 3</option>
                    </Select>
</Stack>`}
                  </ChakraCard>
                </pre>
              </div>
            </div>
          </CardBody>
        </ChakraCard>
      </ChakraProvider>
      <motion.div
        style={{
          display: "flex",
          marginTop: "10px",
          marginBottom: "10px",
          fontSize: "18px",
          fontWeight: "600",
        }}
        initial={{ marginLeft: "0" }}
        whileInView={{ marginLeft: "79%" }}
      >
        Библиотека для создания анимаций
      </motion.div>
      <Card title="Framer-Motion">
        <div className="antd-card-wrapper">
          <Image
            preview={false}
            style={{ height: "300px", width: "300px" }}
            src="https://user-images.githubusercontent.com/38039349/60953119-d3c6f300-a2fc-11e9-9596-4978e5d52180.png"
          />
          <div className="antd-text-wrapper">
            <div>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>Плюсы</div>
              <ul className="antd-list-wrapper">
                <li>
                  <b>Интуитивный API:</b> Легко создавать сложные анимации с
                  помощью простого и понятного синтаксиса.
                </li>
                <li>
                  <b>Гибкие возможности:</b> Позволяет контролировать все
                  аспекты анимации, включая переходы между страницами.
                </li>
              </ul>
            </div>
            <Divider />
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "600" }}>Минусы</h4>
              <ul className="antd-list-wrapper">
                <li>
                  <b>Размер библиотеки:</b> Загружает некоторый объём данных,
                  что может повлиять на время загрузки страницы.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider>Примеры</Divider>
        <div
          style={{
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Scroll
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Card style={{ width: "1000px", borderRadius: "8px 8px 0 0" }}>
            <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
            <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
          </Card>
          <pre style={{ width: "1000px" }}>
            <Card style={{ borderRadius: "0 0 8px 8px" }}>
              {`
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  
  const x = useTransform(baseX, (v) => {wrap(-20, -45, v)}%);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
    </section>
  );
}`}
            </Card>
          </pre>
        </div>
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Layout
        </div>
        <LayoutGroup>
          <Card style={{ borderRadius: "8px 8px 0 0" }}>
            <motion.div
              layout
              style={{
                height: !isOpen ? "100px" : "500px",
                backgroundColor: "gray",
                padding: "20px",
              }}
              onClick={() => setOpen(!isOpen)}
            >
              Анимация если компонента перерисовывается и каким-либо её вид
              менялся
            </motion.div>
          </Card>
        </LayoutGroup>
        <pre>
          <Card style={{ borderRadius: "0 0 8px 8px" }}>
            {`
const [isOpen, setOpen] = useState(false);
import {
  LayoutGroup,
  motion,
} from "framer-motion";


export default function App() {
  return (
        <LayoutGroup>
          <Card style={{ width: "1000px", borderRadius: "8px 8px 0 0" }}>
            <motion.div
              layout
              style={{
                height: !isOpen ? "100px" : "500px",
                backgroundColor: "gray",
                padding: "20px",
              }}
              onClick={() => setOpen(!isOpen)}
            >
              Анимация если компонента перерисовывается и каким-либо её вид
              менялся
            </motion.div>
          </Card>
        </LayoutGroup>
  );
}`}
          </Card>
        </pre>
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Помощники в анимации (whileHover, whileTap и т.д.)
        </div>
        <Card style={{ borderRadius: "8px 8px 0 0" }}>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Нажми или наведи на меня для анимации
          </motion.button>
        </Card>
        <pre>
          <Card style={{ borderRadius: "0 0 8px 8px" }}>
            {`
import {
  motion,
} from "framer-motion";


export default function App() {
  return (
        <Card style={{ borderRadius: "8px 8px 0 0" }}>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Нажми или наведи на меня для анимации
          </motion.button>
        </Card>
  );
}`}
          </Card>
        </pre>
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Анимации появления и исчезания в дереве
        </div>

        <Card style={{ borderRadius: "8px 8px 0 0" }}>
          <div style={{ display: "flex", columnGap: "16px" }}>
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible(!visible)}
            >
              {visible ? "Скрыть элемент" : "Показать элемент"}
            </motion.button>
            <AnimatePresence>
              {visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Привет мир!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
        <pre>
          <Card style={{ borderRadius: "0 0 8px 8px" }}>
            {`<motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible(!visible)}
            >
              {visible ? "Скрыть элемент" : "Показать элемент"}
</motion.button>
            
<AnimatePresence>
              {visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Привет мир!
                </motion.div>
              )}
</AnimatePresence>`}
          </Card>
        </pre>
      </Card>
    </div>
  );
}

export default App;
